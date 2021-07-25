import numpy as np


class SumTree:

    def __init__(self, capacity):
        self.capacity = capacity
        # Bi-tree nodes, first (capacity - 1) nodes are parents,
        # last capacity nodes are leaves
        self.tree = np.zeros(2 * capacity - 1)
        # Memories
        self.data = np.zeros(capacity, dtype=object)
        # Data pointer
        self.ptr = 0

    def add(self, priority, data):
        """Add data with priority.
        """
        tree_idx = self.ptr + self.capacity - 1  # index of leaves
        self.data[self.ptr] = data
        self.update(tree_idx, priority)
        self.ptr += 1
        if self.ptr >= self.capacity:
            self.ptr = 0

    def update(self, tree_idx, priority):
        """Update sumtree. First modify the priority of leaves,
            then back propagate the parents.
        """
        delta = priority - self.tree[tree_idx]
        self.tree[tree_idx] = priority
        while tree_idx != 0:
            tree_idx = (tree_idx - 1) // 2
            self.tree[tree_idx] += delta

    def get_leaf(self, v):
        """Get the leaf with priority of v
        """
        parent = 0
        while True:
            left_child = 2 * parent + 1
            right_child = left_child + 1
            if left_child >= len(self.tree):
                leaf = parent
                break
            elif v <= self.tree[left_child]:
                parent = left_child
            else:
                v -= self.tree[left_child]
                parent = right_child
        data = leaf - self.capacity + 1
        return leaf, self.tree[leaf], self.data[data]

    def priority_sum(self):
        return self.tree[0]


class Buffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.ptr = 0

        self.eps = 0.01
        self.alpha = 0.6
        self.beta = 0.4
        self.beta_increment_per_sampling = 0.001
        self.abs_err_upper = 1.0

        self.tree = SumTree(capacity)

    def store(self, transition):
        self.ptr += 1
        priority_max = np.max(self.tree.tree[-self.tree.capacity:])
        if priority_max == 0:
            priority_max = self.abs_err_upper
        self.tree.add(priority_max, transition)

    def sample(self, batch_size):
        batch_idx = np.empty((batch_size,), dtype=np.int32)
        batch_memory = np.empty((batch_size, self.tree.data[0].size))
        ISWeights = np.empty((batch_size, 1))
        priority_segment = self.tree.priority_sum() / batch_size
        self.beta = np.min([1., self.beta + self.beta_increment_per_sampling])
        probability_min = np.min(self.tree.tree[-self.tree.capacity:]) / self.tree.priority_sum()
        for i in range(batch_size):
            a, b = priority_segment * i, priority_segment * (i + 1)
            v = np.random.uniform(a, b)
            idx, priority, data = self.tree.get_leaf(v)
            probability = priority / self.tree.priority_sum()
            ISWeights[i, 0] = np.power(probability / probability_min, -self.beta, dtype="float32")
            batch_idx[i], batch_memory[i, :] = idx, data
        return batch_memory, (batch_idx, ISWeights)

    def update(self, tree_idx, td_loss):
        td_loss += self.eps
        clipped_loss = np.minimum(td_loss, self.abs_err_upper)
        priorities = np.power(clipped_loss, self.alpha)
        for idx, priority in zip(tree_idx, priorities):
            self.tree.update(idx, priority)
