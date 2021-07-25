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
key = SQueue(1)
for i in range(n):
    key.enqueue(int(input('')))
s = input('')
order = int(input(''))
if order == 1:
    for i in range(len(s)):
        currentorder = key.dequeue()
        key.enqueue(currentorder)
        s = s[:i] + chr(ord(s[i]) + currentorder) + s[i+1:]
elif order == 2:
    for i in range(len(s)):
        currentorder = key.dequeue()
        key.enqueue(currentorder)
        s = s[:i] + chr(ord(s[i]) - currentorder) + s[i+1:]
print(s)

