from game import Game
from dqn import DQN
import torch
import numpy as np

max_score = 0
average = 0
max_average = 0
episodes = 10000

env = Game()
dqn = DQN(n_state=16, n_action=4)

path = "./checkpoint/best"

if path != "":
    dqn.epsilon = dqn.epsilon_max = 0
    dqn.load(path)

print("开始训练...")
for i_episode in range(episodes):
    env.reset()
    done = False
    s = env.get_state()
    s = np.log2(1 + s) / 16
    s = torch.FloatTensor(s)

    while True:
        a = dqn.decide_action(s)

        # 处理无效的移动
        r = env.move(a)
        while r == -1:
            a = (a + 1) % 4
            r = env.move(a)
        r = np.log2(r + r + 1)

        s_ = env.get_state()
        s_ = np.log2(1 + s_) / 16
        s_ = torch.FloatTensor(s_)
        dqn.store_transition(s, a, r, s_)
        s = s_

        if dqn.buffer.ptr % dqn.train_interval == 0 and dqn.buffer.ptr > dqn.buffer.capacity:
            dqn.replay()

        if env.end:
            if env.score > max_score:
                max_score = env.score
            if i_episode % 100 == 0:
                dqn.epsilon_decay(i_episode, episodes)
                print("\rEpisode_{}: average {} ;max_score {}; step {}".format(i_episode, average, max_score,
                                                                               dqn.buffer.ptr), end="")
                if average > max_average:
                    max_average = average
                    dqn.save(int(average))
                max_score = average = env.score
            else:
                average = average * 0.99 + env.score * 0.01
            break
