import datetime
import time

import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import buffer


class QNet(nn.Module):
    def __init__(self, input_len, output_num, conv_size=(32, 64), fc_size=(512, 128)):
        super(QNet, self).__init__()
        self.input_len = input_len
        self.output_num = output_num

        self.conv1 = nn.Sequential(
            nn.Conv2d(1, conv_size[0], 3, 1, 1),
            nn.ReLU(inplace=True)
        )
        self.conv2 = nn.Sequential(
            nn.Conv2d(conv_size[0], conv_size[1], 3, 1, 1),
            nn.ReLU(inplace=True),
        )

        self.fc1 = nn.Linear(conv_size[1] * self.input_len * self.input_len, fc_size[0])
        self.fc2 = nn.Linear(fc_size[0], fc_size[1])
        self.head = nn.Linear(fc_size[1], self.output_num)

    def forward(self, x):
        x = x.reshape(-1, 1, self.input_len, self.input_len)
        x = self.conv1(x)
        x = self.conv2(x)
        x = x.view(x.size(0), -1)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))

        output = self.head(x)

        return output


class DQN(object):
    def __init__(self, n_state, n_action):
        super(DQN, self).__init__()
        self.n_state = n_state
        self.n_action = n_action
        self.lr = 1e-4
        self.train_interval = 5
        self.clip_norm_max = 1

        self.epsilon_max = self.epsilon = 0
        self.gamma = 0.8
        self.theta = 0.1
        self.network_iteration = 128
        self.batch_size = 128
        self.memory_capacity = 10248

        self.eval_net = QNet(int(np.sqrt(self.n_state)), self.n_action)
        self.target_net = QNet(int(np.sqrt(self.n_state)), self.n_action)
        self.optimizer = torch.optim.Adam(self.eval_net.parameters(), lr=self.lr)
        self.loss_func = nn.MSELoss()
        self.buffer = buffer.Buffer(self.memory_capacity)

        self.step = 0

    # 策略
    def decide_action(self, x):
        if np.random.uniform() > self.epsilon:  # Greedy 策略
            action_values = self.eval_net.forward(x)
            action = torch.argmax(action_values).data.numpy()
        else:
            action = np.random.randint(0, self.n_action)
        return action

    # 经验保存
    def store_transition(self, state, action, reward, state_next):
        state = state.reshape(-1)
        state_next = state_next.reshape(-1)

        transition = np.hstack((state, [action, reward], state_next))
        self.buffer.store(transition)

    def replay(self):
        # 更新目标网络
        if self.step % self.network_iteration == 0:
            for eval_para, target_para in zip(self.eval_net.parameters(), self.target_net.parameters()):
                target_para.data = self.theta * eval_para.data + (1 - self.theta) * target_para.data

        self.step += 1

        batch_memory, (tree_idx, ISWeights) = self.buffer.sample(self.batch_size)
        batch_state = torch.FloatTensor(batch_memory[:, :self.n_state])
        batch_action = torch.LongTensor(batch_memory[:, self.n_state: self.n_state + 1].astype(int))
        batch_reward = torch.FloatTensor(batch_memory[:, self.n_state + 1: self.n_state + 2])
        batch_state_next = torch.FloatTensor(batch_memory[:, -self.n_state:])

        # 计算差距
        q_eval = self.eval_net(batch_state).gather(1, batch_action)  # shape (batch, 1)
        q_next = self.target_net(batch_state_next).detach()
        q_target = batch_reward + self.gamma * q_next.max(1)[0].view(self.batch_size, 1)

        # 更新经验池
        abs_error = (q_target - q_eval.data).abs()
        self.buffer.update(tree_idx, abs_error)

        loss = self.loss_func(q_eval, q_target)

        self.optimizer.zero_grad()
        loss.backward()
        nn.utils.clip_grad_norm_(self.eval_net.parameters(), self.clip_norm_max)

        self.optimizer.step()

    def epsilon_decay(self, episode, total_episode):
        self.epsilon = self.epsilon_max * (1 - episode / total_episode)

    def save(self, info):
        torch.save(self.eval_net.state_dict(), "./checkpoint/{} avg {}".format(
            datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S'), info))

    def load(self, path):
        self.eval_net.load_state_dict(torch.load(path))
        self.target_net.load_state_dict(torch.load(path))
