from random import randint, random

import numpy as np


def push_left(grid):
    moved, score = False, 0
    rows, columns = grid.shape[0], grid.shape[1]
    for k in range(rows):
        i, last = 0, 0
        for j in range(columns):
            e = grid[k, j]
            if e:
                if e == last:
                    grid[k, i - 1] += e
                    score += e
                    last, moved = 0, True
                else:
                    moved |= (i != j)
                    last = grid[k, i] = e
                    i += 1
        while i < columns:
            grid[k, i] = 0
            i += 1
    return score if moved else -1


def push_right(grid):
    moved, score = False, 0
    rows, columns = grid.shape[0], grid.shape[1]
    for k in range(rows):
        i = columns - 1
        last = 0
        for j in range(columns - 1, -1, -1):
            e = grid[k, j]
            if e:
                if e == last:
                    grid[k, i + 1] += e
                    score += e
                    last, moved = 0, True
                else:
                    moved |= (i != j)
                    last = grid[k, i] = e
                    i -= 1
        while 0 <= i:
            grid[k, i] = 0
            i -= 1
    return score if moved else -1


def push_up(grid):
    moved, score = False, 0
    rows, columns = grid.shape[0], grid.shape[1]
    for k in range(columns):
        i, last = 0, 0
        for j in range(rows):
            e = grid[j, k]
            if e:
                if e == last:
                    score += e
                    grid[i - 1, k] += e
                    last, moved = 0, True
                else:
                    moved |= (i != j)
                    last = grid[i, k] = e
                    i += 1
        while i < rows:
            grid[i, k] = 0
            i += 1
    return score if moved else -1


def push_down(grid):
    moved, score = False, 0
    rows, columns = grid.shape[0], grid.shape[1]
    for k in range(columns):
        i, last = rows - 1, 0
        for j in range(rows - 1, -1, -1):
            e = grid[j, k]
            if e:
                if e == last:
                    score += e
                    grid[i + 1, k] += e
                    last, moved = 0, True
                else:
                    moved |= (i != j)
                    last = grid[i, k] = e
                    i -= 1
        while 0 <= i:
            grid[i, k] = 0
            i -= 1
    return score if moved else -1


def push(grid, direction):
    if direction & 1:
        if direction & 2:
            score = push_down(grid)
        else:
            score = push_up(grid)
    else:
        if direction & 2:
            score = push_right(grid)
        else:
            score = push_left(grid)
    return score


def put_new_cell(grid):
    n = 0
    r = 0
    i_s = [0] * 16
    j_s = [0] * 16
    for i in range(grid.shape[0]):
        for j in range(grid.shape[1]):
            if not grid[i, j]:
                i_s[n] = i
                j_s[n] = j
                n += 1
    if n > 0:
        r = randint(0, n - 1)
        grid[i_s[r], j_s[r]] = 2 if random() < 0.9 else 4
    return n


def any_possible_moves(grid):
    """Return True if there are any legal moves, and False otherwise."""
    rows = grid.shape[0]
    columns = grid.shape[1]
    for i in range(rows):
        for j in range(columns):
            e = grid[i, j]
            if not e:
                return True
            if j and e == grid[i, j - 1]:
                return True
            if i and e == grid[i - 1, j]:
                return True
    return False


def prepare_next_turn(grid):
    """
    Spawn a new number on the grid; then return the result of
    any_possible_moves after this change has been made.
    """
    empties = put_new_cell(grid)
    return empties > 1 or any_possible_moves(grid)


class Game:
    def __init__(self, cols=4, rows=4):
        self.rows = rows
        self.cols = cols
        self.grid_array = np.zeros(shape=(self.rows, self.cols), dtype='float32')
        self.grid = self.grid_array
        # 初始放置两个方块
        for i in range(2):
            put_new_cell(self.grid)
        self.score = 0
        self.end = False

    def copy(self):
        rtn = Game(self.grid.shape[0], self.grid.shape[1])
        for i in range(self.grid.shape[0]):
            for j in range(self.grid.shape[1]):
                rtn.grid[i, j] = self.grid[i, j]
        rtn.score = self.score
        rtn.end = self.end
        return rtn

    def max(self):
        m = 0
        for i in range(self.grid.shape[0]):
            for j in range(self.grid.shape[1]):
                if self.grid[i, j] > m:
                    m = self.grid[i, j]
        return m

    def move(self, direction):
        if direction & 1:
            if direction & 2:
                score = push_left(self.grid)  # 3
            else:
                score = push_right(self.grid)  # 1
        else:
            if direction & 2:
                score = push_down(self.grid)  # 2
            else:
                score = push_up(self.grid)  # 0
        if score == -1:
            return score

        self.score += score
        if not prepare_next_turn(self.grid):
            self.end = True
        return score

    def display(self):
        print("")
        wall = "+------" * self.grid.shape[1] + "+"
        print(wall)
        for i in range(self.grid.shape[0]):
            meat = "|".join("{:^6}".format(self.grid[i, j]) for j in range(self.grid.shape[1]))
            print("|{}|".format(meat))
            print(wall)

    def reset(self):
        self.grid_array = np.zeros(shape=(self.rows, self.cols), dtype='float32')
        self.grid = self.grid_array
        for i in range(2):
            put_new_cell(self.grid)
        self.score = 0
        self.end = False

    def get_state(self):
        return self.grid.copy()

    def available_cells(self):
        cells = []

        for i in range(4):
            for j in range(4):
                if self.grid[i][j] == 0:
                    cells.append({"x": i, "y": j})

        return cells

    def add_tile(self, pos, val):
        self.grid[pos["x"], pos["y"]] = val

    def get_vector(self, dir):
        map = {
            1: {"x": 0, "y": -1},
            2: {"x": 1, "y": 0},
            3: {"x": 0, "y": 1},
            0: {"x": -1, "y": 0}
        }
        return map[dir]

    def cell_content(self, position):
        return position["x"] >= 0 and position["x"] < 4 and position["y"] >= 0 and position["y"] < 4

    def build_traversals(self, vector):
        traversals = {"x": [], "y": []}

        for i in range(4):
            traversals["x"].append(i)
            traversals["y"].append(i)

        if (vector["x"] == 1):
            traversals["x"].reverse()
        if (vector["y"] == 1):
            traversals["y"].reverse()

        return traversals
