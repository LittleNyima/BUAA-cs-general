# -*- coding:utf-8 -*-
import tkinter as tk
import random
import UIResult
import searchEngine

def on_click_exit_button(arg):
    global root
    root.quit()

class HoverButton(tk.Button):
    def __init__(self, master, **kw):
        tk.Button.__init__(self, master = master, **kw)
        self.defaultBackground = self['background']
        self.bind('<Enter>', self.on_enter)
        self.bind('<Leave>', self.on_leave)
    
    def on_enter(self, e):
        self['background'] = self['activebackground']
    
    def on_leave(self, e):
        self['background'] = self.defaultBackground

def randBackground(arg):
    global root
    global background_label
    
    picNUM = random.randint(0,22)
    picdir = '..\\background\\' + str(picNUM) + '.gif'
    photo = tk.PhotoImage(file = picdir)
    #canva.create_image(640, 360, image = photo)
    background_label['image'] = photo
    background_label.image = photo
    '''canva.config(image = photo)
    # When called rises AttributeError
    canva.draw()
    root.update_idletasks()()'''

def on_search(arg):
    global root
    global entry
    
    text = entry.get()
    tree = searchEngine.setupTree()
    result = tree.search(text)
    root.destroy()
    UIResult.main(tree, text, result)
    exit()

def main():
    global root
    global background_label
    global entry
    global search_button
    global refresh_button
    global exit_button
    
    width = 1280
    height = 720
    
    root = tk.Tk()
    
    # Hiden title and put at the center
    root.overrideredirect(True)
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    root.geometry("%dx%d+%d+%d" % (width, height, x, y))
    
    picNUM = random.randint(0,22)
    picdir = '..\\background\\' + str(picNUM) + '.gif'
    photo = tk.PhotoImage(file = picdir)
    background_label = tk.Label(root, image = photo, compound = tk.CENTER)
    background_label.pack()
    '''canva = tk.Canvas(root, width = 1280, height = 720)
    canva.create_image(640, 360, image = photo)
    canva.pack()'''
    
    entry = tk.Entry(root, relief = 'flat', font = ('微软雅黑', 15))
    entry.place(x = 265, y = 430, width = 650, height = 35)
    entry.bind('<Return>', on_search)
    
    search_pic = tk.PhotoImage(file = '..\\src\\search_blue.gif')
    search_button = tk.Button(root, image = search_pic, relief = 'flat')
    search_button.place(x = 915, y = 430, width = 35, height = 35)
    search_button.bind('<Button-1>', on_search)
    
    refresh_pic = tk.PhotoImage(file = '..\\src\\refresh_pink.gif')
    refresh_button = tk.Button(root, image = refresh_pic, relief = 'flat')
    refresh_button.place(x = 950, y = 430, width = 35, height = 35)
    refresh_button.bind('<Button-1>', randBackground)
    
    exit_text = '退出系统'
    exit_button = HoverButton(root, 
                              text = exit_text,
                              font = ('华文琥珀', 14),
                              fg = '#ffffff',
                              background = '#00d0ff', 
                              activebackground = '#e11e88',
                              relief = 'flat')
    exit_button.place(x = 1120, y = 680, width = 158, height = 38)
    exit_button.bind('<Button-1>', on_click_exit_button)
    
    root.mainloop()

if __name__ == '__main__':
    main()