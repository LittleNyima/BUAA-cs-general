import torch
import numpy as np
from torch import nn

from strategy import StrategyAI
from game import Game
from dqn import QNet

q_net = QNet(4, 4)
game = Game()
strategy_ai = StrategyAI(game)

episodes = 2000

lr = 1e-3

optimizer = torch.optim.Adam(q_net.parameters(), lr=lr)
loss_func = nn.MSELoss()
loss = 1e10

for i_episode in range(episodes):
    game.reset()
    while not game.end:
        action = strategy_ai.next_move()
        action_target = torch.zeros((1, 4))
        action_target[0][action] = 1.0
        data = torch.FloatTensor(np.log2(1 + game.grid) / 16)
        action_pred = q_net(data)
        loss = loss_func(action_pred, action_target)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    if i_episode % 50 == 0:
        print("\r Loss: {.2f}".format(loss))

torch.save(q_net.state_dict(), "./supervise_dqn")
