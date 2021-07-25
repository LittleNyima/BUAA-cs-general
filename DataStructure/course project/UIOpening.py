# -*- coding:utf-8 -*-
import tkinter as tk
import UIMain

def updatePIC(arg):
    global root
    if arg == '22':
        pic = tk.PhotoImage(file = "..\\src\\22.gif")
    elif arg == '33':
        pic = tk.PhotoImage(file = "..\\src\\33.gif")
    pic_label = tk.Label(root)
    pic_label.place(x = 690, y = 83, width = 169, height = 169)
    #pic_label.config(image = pic)
    pic_label['image'] = pic
    pic_label.image = pic

def on_click_cheers(arg):
    global root
    root.destroy()
    UIMain.main()
    exit()

def on_click_exit_button(arg):
    root.quit()

class HoverButton(tk.Button):
    def __init__(self, master, **kw):
        tk.Button.__init__(self, master = master, **kw)
        self.defaultBackground = self['background']
        self.bind('<Enter>', self.on_enter)
        self.bind('<Leave>', self.on_leave)
    
    def on_enter(self, e):
        self['background'] = self['activebackground']
        updatePIC('22')
    
    def on_leave(self, e):
        self['background'] = self.defaultBackground
        updatePIC('33')

def main():
    global root
    width = 960
    height = 540
    
    root = tk.Tk()
    
    # Hiden title and put at the center
    root.overrideredirect(True)
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    root.geometry("%dx%d+%d+%d" % (width, height, x, y))
    
    # Load background picture
    photo = tk.PhotoImage(file = "..\\src\\background.png")
    background_label = tk.Label(root, image = photo, compound = tk.CENTER)
    background_label.pack()
    
    # Update picture
    pic = tk.PhotoImage(file = "..\\src\\33.gif")
    pic_label = tk.Label(root)
    pic_label.place(x = 690, y = 83, width = 169, height = 169)
    pic_label.config(image = pic)
    pic_label.image = pic
    
    # Button 'cheers'
    button_text = '(゜-゜)つロ 乾杯~'
    button = HoverButton(root, 
                         text = button_text, 
                         font = ('华文琥珀', 18),
                         fg = '#ffffff',
                         background = '#00d0ff', 
                         activebackground = '#e11e88',
                         relief = 'flat')
    button.place(x = 670, y = 325, width = 210, height = 70)
    button.bind('<Button-1>', on_click_cheers)
    
    # Button 'Exit'
    exit_text = '退出系统'
    exit_button = HoverButton(root, 
                              text = exit_text,
                              font = ('华文琥珀', 18),
                              fg = '#ffffff',
                              background = '#00d0ff', 
                              activebackground = '#e11e88',
                              relief = 'flat')
    exit_button.place(x = 670, y = 405, width = 210, height = 70)
    exit_button.bind('<Button-1>', on_click_exit_button)

    root.mainloop()
    
    return
    
if __name__ == '__main__':
    main()
