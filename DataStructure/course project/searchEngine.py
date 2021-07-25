import hashlib
import os

class Anime:
    def __init__(self, name = [],tag = 'default tag'):
        self.name = name
        self.tag = tag
        self.name_code = []
        self.tag_code = hashlib.md5(self.tag.encode(encoding = 'UTF-8').lower()).hexdigest()
        for n in self.name:
            self.name_code.append(hashlib.md5(n.encode(encoding = 'UTF-8').lower()).hexdigest())

class Node:
    def __init__(self):
        self.max_son = 5
        self.data = [] # max data number is 4
        self.pointer = [] # max son-pointer number is 5
        self.father = None
        self.pre = None
        self.next = None
    
    def isFull(self):
        return len(self.data) == 4
    
    def isOverflow(self):
        return len(self.data) == 5
    
    def insert(self, Anime):
        if Anime.tag_code < self.data[0].tag_code:
            self.data = [Anime] + self.data
            return 0
        elif len(self.data) == 1 or Anime.tag_code < self.data[1].tag_code:
            self.data = self.data[0:1] + [Anime] + self.data[1:]
            return 1
        elif len(self.data) == 2 or Anime.tag_code < self.data[2].tag_code:
            self.data = self.data[0:2] + [Anime] + self.data[2:]
            return 2
        elif len(self.data) == 3 or Anime.tag_code < self.data[3].tag_code:
            self.data = self.data[0:3] + [Anime] + self.data[3:]
            return 3
        elif len(self.data) == 4 or Anime.tag_code < self.data[4].tag_code:
            self.data = self.data[0:4] + [Anime] + self.data[4:]
            return 4

class BPTree:
    def __init__(self):
        self.root = Node()
        self.first_leaf = self.root
        self.last_leaf = self.root
    
    def isEmpry(self):
        return self.root.data == []
    
    def insert(self, Anime):
        if self.isEmpry():
            self.root.data = [Anime]
            return
        leaf = self.first_leaf
        while True:
            if leaf.next == None:
                leaf.insert(Anime)
                '''try:
                    print(Anime.tag)
                except:
                    pass'''
                break
            elif Anime.tag_code <= leaf.data[-1].tag_code:
                leaf.insert(Anime)
                '''try:
                    print(Anime.tag)
                except:
                    pass'''
                break
            elif Anime.tag_code > leaf.data[-1].tag_code and Anime.tag_code < leaf.next.data[0].tag_code:
                leaf.insert(Anime)
                '''try:
                    print(Anime.tag)
                except:
                    pass'''
                break
            else:
                leaf = leaf.next
        isleaf = True
        while leaf.isOverflow():
            left = Node()
            right = Node()
            if isleaf:
                left.data = leaf.data[0:2]
                right.data = leaf.data[2:]
            else:
                left.data = leaf.data[0:2]
                right.data = leaf.data[3:]
            left.pointer = leaf.pointer[0:3]
            for i in left.pointer:
                i.father = left
            right.pointer = leaf.pointer[3:6]
            for i in right.pointer:
                i.father = right
            if leaf.father == None:
                leaf.father = Node()
                leaf.father.data.append(leaf.data[2])
                leaf.father.pointer.append(left)
                leaf.father.pointer.append(right)
            else:
                insert_pos = leaf.father.insert(leaf.data[2])
                leaf.father.pointer = list(leaf.father.pointer[:insert_pos]) + [left, right] + leaf.father.pointer[insert_pos+1:]
            left.father = leaf.father
            right.father = leaf.father 
            left.next = right
            right.pre = left
            if not leaf.pre == None:
                left.pre = leaf.pre
                leaf.pre.next = left
            else:
                self.first_leaf = left
                while not self.first_leaf.pointer == []:
                    self.first_leaf = self.first_leaf.pointer[0]
            if not leaf.next == None:
                right.next = leaf.next
                leaf.next.pre = right
            else:
                self.last_leaf = right
                while not self.last_leaf.pointer == []:
                    self.last_leaf = self.last_leaf.pointer[-1]
            leaf = leaf.father
            isleaf = False
            #print('---------------split----------------')
        while not leaf.father == None:
            leaf = leaf.father
        self.root = leaf
        '''print('check1')
        checkTree(self.root)
        print('check2')
        checkTree2(self.first_leaf)'''
    
    def search(self, tag):
        tag_code = hashlib.md5(tag.encode(encoding = 'UTF-8').lower()).hexdigest()
        current = self.root
        while True:
            if current.pointer == []:
                for i in range(len(current.data)):
                    if (not current.pre == None and  current.pre.data[-1].tag_code == tag_code):
                        return current.pre.data[i]
                    elif current.data[i].tag_code == tag_code:
                        return current.data[i]
                    elif (not current.next == None and current.next.data[0].tag_code == tag_code):
                        return current.next.data[i]
                return Anime()
            else:
                if tag_code < current.data[0].tag_code:
                    current = current.pointer[0]
                elif len(current.data) == 1 or tag_code < current.data[1].tag_code:
                    current = current.pointer[1]
                elif len(current.data) == 2 or tag_code < current.data[2].tag_code:
                    current = current.pointer[2]
                elif len(current.data) == 3 or tag_code < current.data[3].tag_code:
                    current = current.pointer[3]
                else:
                    current = current.pointer[4]

def checkTree(root):
    print('data:[' ,end = '')
    for j in root.data:
        try:
            print(j.tag, end = '    ')
        except:
            print('unsupported character')
    print(len(root.data), end = '')
    print(']        ', end = '')
    print('pointer:', end = '')
    print(len(root.pointer))
    for i in root.pointer:
        checkTree(i)

def checkTree2(leaf):
    if leaf == None:
        return
    print('data:[' ,end = '')
    for j in leaf.data:
        try:
            print(j.tag, end = '    ')
        except:
            print('unsupported character')
    print(len(leaf.data), end = '')
    print(']')
    checkTree2(leaf.next)
    
def setupTree():
    db_dir = '..\\database\\'
    tags = os.listdir(db_dir)
    tree = BPTree()
    for tag in tags:
        tag_dir = db_dir + tag
        animations = os.listdir(tag_dir)
        anime = Anime(animations, tag)
        tree.insert(anime)
    return tree

if __name__ == '__main__':
    db_dir = '..\\database\\'
    tags = os.listdir(db_dir)
    tree = BPTree()
    for tag in tags:
        tag_dir = db_dir + tag
        animations = os.listdir(tag_dir)
        anime = Anime(animations, tag)
        tree.insert(anime)
    print('done')
    a = input()
    print(tree.search(a).name)
    