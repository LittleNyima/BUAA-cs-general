import numpy as np
import torch

EXPLORE_TIMES = 16
MAX_DEPTH = 3


class MCTS:
    sub_node = []
    sub_visit = [False, False, False, False]

    def __init__(self, game, mov_net, eval_net, depth=0):
        self.depth = depth
        self.game = game
        self.mov_net = mov_net
        self.eval_net = eval_net
        self.U = np.zeros(4)
        self.P = mov_net.decide_action(torch.FloatTensor(np.log2(1 + game.grid) / 16)).data.numpy()
        self.N = np.zeros(4)
        self.W = np.zeros(4)
        self.Q = np.zeros(4)
        self.v = eval_net(torch.FloatTensor(np.log2(1 + game.grid) / 16))

    def expand(self, action):
        if self.sub_visit[action]:
            self.sub_node[action].expand()
            return
        self.sub_visit[action] = True
        sub_game = self.game.copy()
        r = sub_game.move(action)
        while r == -1:
            r = sub_game.move(action)
        self.sub_node.append(MCTS(self.game, self.mov_net, self.eval_net, self.depth + 1))
        self.N[action] += 1
        for i in range(4):
            self.U[i] = self.P[i] * np.sqrt(self.N.sum()) / (1 + self.N[i])
        self.W[action] += self.sub_node[action].v
        self.Q[action] = self.W[action] / self.N[action]

    def decide_action(self):
        for i in range(EXPLORE_TIMES):
            action = np.max(self.U + self.Q)
            self.expand(action)
        return self.N.argmax()
