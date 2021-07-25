from game import Game
from dqn import DQN
import torch
import numpy as np

max_score = 0
average = 0
episodes = 50

env = Game()
dqn = DQN(n_state=16, n_action=4)

path = "./checkpoint/2021-06-07 23:52:45 avg 3838.4"

dqn.load(path)

print("测试中...\n")
for i_episode in range(episodes):
    env.reset()
    done = False
    while True:
        s = env.get_state()
        s = np.log2(1 + s) / 16
        s = torch.FloatTensor(s)

        a = dqn.decide_action(s)
        r = env.move(a)
        while r == -1:
            a = (a + 1) % 4
            r = env.move(a)

        if env.end:
            if env.score > max_score:
                max_score = env.score
            average += env.score
            break
dqn.save(int(average / episodes))
print("{} 次游戏平均分 {}, 最高分: {}".format(episodes, average / episodes, max_score))
