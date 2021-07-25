class SQueue(object):
	def __init__(self, init_len=8):
		self.__elem = [0] * init_len
		self.__len = init_len
		self.__head = 0
		self.__num = 0


	def __extend(self):
		old_len = self.__len
		self.__len *= 2
		new_elems = [0] * self.__len
		for i in range(old_len):
			new_elems[i] = self.__elem[(self.__head + i) % old_len]
		self.__elem, self.__head = new_elems, 0


	def is_empty(self):
		return self.__num == 0


	def peek(self):
		if self.__num == 0:
			raise QueueUnderflow
		return self.__elem[self.__head]
		

	def enqueue(self, e):
		if self.__num == self.__len:
			self.__extend()
		self.__elem[(self.__head + self.__num) % self.__len] = e
		self.__num += 1
		
		
	def dequeue(self):
		if self.__num == 0:
			raise QueueUnderflow
		e = self.__elem[self.__head]
		self.__head = (self.__head + 1) % self.__len
		self.__num -= 1
		return e

n = int(input(''))
queA = SQueue(1)
queB = SQueue(1)
queC = SQueue(1)
for i in range(n):
    s = input('')
    if s[-1] == 'A':
        queA.enqueue(s[0])
    elif s[-1] == 'B':
        queB.enqueue(s[0])
    elif s[-1] == 'C':
        queC.enqueue(s[0])
while(not queA.is_empty()):
    print(queA.dequeue())
while(not queB.is_empty()):
    print(queB.dequeue())
while(not queC.is_empty()):
    print(queC.dequeue())

