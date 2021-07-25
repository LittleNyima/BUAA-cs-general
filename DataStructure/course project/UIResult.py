# -*- coding:utf-8 -*-
import tkinter as tk
import searchEngine
from tkinter import IntVar, DoubleVar
from tkinter.constants import HORIZONTAL, DISABLED, NORMAL, END
from tkinter.font import BOLD
import math
import json

def update_frame():
    global root
    
    global tree_
    global result_
    global text_
    global index
    
    global display
    
    global top_label
    global comment_button1
    global comment_button2
    global comment_button3
    global pic_label1
    global pic_label2
    global pic_label3
    global title_label1
    global title_label2
    global title_label3
    global info_label1
    global info_label2
    global info_label3
    global abstract_label1
    global abstract_label2
    global abstract_label3
    global page_mark
    
    if len(text_) <= 25:
        top_text = '检索“' + text_ + '”共得到' + str(len(result_.name)) + '条结果。'
    else:
        top_text = '检索“' + text_[:25] + '...' + '”共得到' + str(len(result_.name)) + '条结果。'
    top_label.delete(1.0, tk.END)
    top_label.insert(1.0, top_text)
    
    if len(display) >= 1:
        pic1 = tk.PhotoImage(file = '..\\database\\' + result_.tag + '\\' + display[0] + '\\'
                             + display[0] + '-thumb.gif')
        title1 = display[0]
        info1, abstract1 = load_info(result_.tag, display[0])
        comment_button1.place(x = 280, y = 275, width = 100, height = 20)
    else:
        pic1 = tk.PhotoImage(file = '..\\src\\blank.gif')
        title1 = ''
        info1, abstract1 = '', ''
        comment_button1.place_forget()
    pic_label1['image'] = pic1
    pic_label1.image = pic1
    title_label1.delete(1.0, tk.END)
    title_label1.insert(1.0, title1)
    info_label1.delete(1.0, tk.END)
    info_label1.insert(1.0, info1)
    abstract_label1.delete(1.0, tk.END)
    abstract_label1.insert(1.0, abstract1)
    
    if len(display) >= 2:
        pic2 = tk.PhotoImage(file = '..\\database\\' + result_.tag + '\\' + display[1] + '\\'
                             + display[1] + '-thumb.gif')
        title2 = display[1]
        info2, abstract2 = load_info(result_.tag, display[1])
        comment_button2.place(x = 280, y = 435, width = 100, height = 20)
    else:
        pic2 = tk.PhotoImage(file = '..\\src\\blank.gif')
        title2 = ''
        info2, abstract2 = '', ''
        comment_button2.place_forget()
    pic_label2['image'] = pic2
    pic_label2.image = pic2
    title_label2.delete(1.0, tk.END)
    title_label2.insert(1.0, title2)
    info_label2.delete(1.0, tk.END)
    info_label2.insert(1.0, info2)
    abstract_label2.delete(1.0, tk.END)
    abstract_label2.insert(1.0, abstract2)
    
    if len(display) >= 3:
        pic3 = tk.PhotoImage(file = '..\\database\\' + result_.tag + '\\' + display[2] + '\\'
                             + display[2] + '-thumb.gif')
        title3 = display[2]
        info3, abstract3 = load_info(result_.tag, display[2])
        comment_button3.place(x = 280, y = 595, width = 100, height = 20)
    else:
        pic3 = tk.PhotoImage(file = '..\\src\\blank.gif')
        title3 = ''
        info3, abstract3 = '', ''
        comment_button3.place_forget()
    pic_label3['image'] = pic3
    pic_label3.image = pic3
    title_label3.delete(1.0, tk.END)
    title_label3.insert(1.0, title3)
    info_label3.delete(1.0, tk.END)
    info_label3.insert(1.0, info3)
    abstract_label3.delete(1.0, tk.END)
    abstract_label3.insert(1.0, abstract3)
    
    page_text = '第 ' + str(index + 1) +'/ ' + str(max(1, math.ceil(len(result_.name) / 3))) + ' 页'
    page_mark['text'] = page_text
    page_mark.text = page_text

def on_mouse_wheel(arg):
    if arg.delta > 0:
        on_click_pre_button(arg)
    elif arg.delta < 0:
        on_click_next_button(arg)

def load_comment(tag, name):
    title = name + '的评论'
    tl = tk.Toplevel(width = 960, height = 540)
    tl.title(title)
    top_frame = tk.Text(tl, font = ('宋体', 12))
    
    anime_dir = '..\\database\\' + tag + '\\' + name + '\\' + name + '-userdata.txt'
    fp = open(anime_dir)
    content = fp.readlines()
    for i in content:
        try:
            comment = json.loads(i)
            top_frame.insert(END, '【' + comment['uname'] + '】  ')
            top_frame.insert(END, comment['time'] + '\n')
            top_frame.insert(END, '  评论： ' + comment['message'] + '\n')
            top_frame.insert(END, '  签名： ' + comment['sign'] + '\n\n')
        except:
            continue
    
    top_frame.place(x = 0, y = 0, relwidth = 0.98, relheight = 1.0)
    
    scroll = tk.Scrollbar(tl, command = top_frame.yview, bg = '#ffffff')
    scroll.place(relx = 0.98, rely = 0, relwidth = 0.02, relheight = 1.0)
    top_frame.config(yscrollcommand = scroll.set)
    scroll.config(command = top_frame.yview)
    
def num_process(num_ch):
    try:
        if num_ch[-1] == '万':
            return float(num_ch[:-1]) * 10000
        else:
            return float(num_ch)
    except:
        return 0

def load_info(tag, name):
    anime_dir = '..\\database\\' + tag + '\\' + name + '\\' + name + '-info.txt'
    fp = open(anime_dir)
    info = fp.readline()
    info_dict = json.loads(info)
    text1 = '播放量： ' + info_dict['播放量'] + '，    ' + '弹幕数： ' + info_dict['弹幕数']
    text2 = info_dict['简介']
    fp.close()
    return (text1, text2)

def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x[1] < pivot[1]]
    middle = [x for x in arr if x[1] == pivot[1]]
    right = [x for x in arr if x[1] > pivot[1]]
    return quicksort(left) + middle + quicksort(right)

def load_play():
    global result_
    
    play = []
    for name in result_.name:
        anime_dir = '..\\database\\' + result_.tag + '\\' + name + '\\' + name + '-info.txt'
        fp = open(anime_dir)
        info = fp.readline()
        info_dict = json.loads(info)
        play.append((name, num_process(info_dict['播放量'])))
        fp.close()
    sorted_list = quicksort(play)
    for i in range(len(result_.name)):
        result_.name[i] = sorted_list[::-1][i][0]

def load_dm():
    global result_
    
    dm = []
    for name in result_.name:
        anime_dir = '..\\database\\' + result_.tag + '\\' + name + '\\' + name + '-info.txt'
        fp = open(anime_dir)
        info = fp.readline()
        info_dict = json.loads(info)
        dm.append((name, num_process(info_dict['播放量'])))
        fp.close()
    sorted_list = quicksort(dm)
    for i in range(len(result_.name)):
        result_.name[i] = sorted_list[::-1][i][0]

def load_sex():
    global result_
    global var_scale
    
    sex = []
    for name in result_.name:
        anime_dir = '..\\database\\' + result_.tag + '\\' + name + '\\' + name + '-info.txt'
        fp = open(anime_dir)
        info = fp.readlines()
        info_dict = json.loads(info[-1])
        rate = info_dict['male'] / max((info_dict['male'] + info_dict['female']), 1)
        delta = abs(rate - var_scale.get() / 100)
        sex.append((name, delta))
        fp.close()
    sorted_list = quicksort(sex)
    for i in range(len(result_.name)):
        result_.name[i] = sorted_list[i][0]

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
    
    def on_leave(self, e):
        self['background'] = self.defaultBackground

def on_check_default(arg):
    global result_
    global index
    global display
    global scale
    
    scale['bg'] = '#ffffff'
    scale['state'] = DISABLED
    scale.place_forget()
    
    result_.name.sort()
    index = 0
    
    display = result_.name[0:3]
    
    update_frame()

def on_check_play(arg):
    global result_
    global index
    global display
    global scale
    
    scale['bg'] = '#ffffff'
    scale['state'] = DISABLED
    scale.place_forget()
    
    load_play()
    index = 0
    
    display = result_.name[0:3]
    
    update_frame()

def on_check_dm(arg):
    global result_
    global index
    global display
    global scale
    
    scale['bg'] = '#ffffff'
    scale['state'] = DISABLED
    scale.place_forget()
    
    load_dm()
    index = 0
    
    display = result_.name[0:3]
    
    update_frame()

def cvtcolor(color):
    part1 = str(hex(color[0]))[2:]
    part2 = str(hex(color[1]))[2:]
    part3 = str(hex(color[2]))[2:]
    part1 = part1 if len(part1) == 2 else '0' + part1
    part2 = part2 if len(part2) == 2 else '0' + part2
    part3 = part3 if len(part3) == 2 else '0' + part3
    return '#' + part1 + part2 + part3

def on_check_sex(arg):
    global scale
    global var_scale
    
    var = var_scale.get()
    blue = (0, 208, 255)
    pink = (225, 30, 136)
    color = (int(var / 100 * pink[0] + (100 - var) / 100 * blue[0]), 
             int(var / 100 * pink[1] + (100 - var) / 100 * blue[1]), 
             int(var / 100 * pink[2] + (100 - var) / 100 * blue[2]))
    scale['bg'] = cvtcolor(color)
    scale['state'] = NORMAL
    scale.place(x = 30, y = 310)
    
    load_sex()
    index = 0
    
    display = result_.name[0:3]
    
    update_frame()

def on_click_scale(arg):
    global scale
    global var_scale
    global display
    global index
    
    var = var_scale.get()
    blue = (0, 208, 255)
    pink = (225, 30, 136)
    color = (int(var / 100 * pink[0] + (100 - var) / 100 * blue[0]), 
             int(var / 100 * pink[1] + (100 - var) / 100 * blue[1]), 
             int(var / 100 * pink[2] + (100 - var) / 100 * blue[2]))
    scale['bg'] = cvtcolor(color)
    
    load_sex()
    
    display = result_.name[index * 3 : index * 3 + 3]
    
    update_frame()

def on_search(arg):
    global root
    global entry
    
    global tree_
    global result_
    global text_
    global index
    
    global display
    
    text = entry.get()
    text_ = text
    result_ = tree_.search(text)
    result_.name.sort()
    index = 0
    
    display = result_.name[0:3]
    
    update_frame()

def on_click_pre_button(arg):
    global root
    
    global result_
    global index
    
    global display
    
    if index == 0:
        return
    else:
        index = index - 1
        display = result_.name[3 * index : 3 * index + 3]
    
    update_frame()
        
def on_click_next_button(arg):
    global root
    
    global result_
    global index
    
    global display
    
    if index == len(result_.name) // 3:
        return
    else:
        index = index + 1
        display = result_.name[3 * index : 3 * index + 3]
    
    update_frame()
    
def on_click_page_mark(arg):
    update_frame()

def on_click_comments1(arg):
    global result_
    global display
    
    load_comment(result_.tag, display[0])

def on_click_comments2(arg):
    global result_
    global display
    
    load_comment(result_.tag, display[1])

def on_click_comments3(arg):
    global result_
    global display
    
    load_comment(result_.tag, display[2])

def main(tree, text, result):
    global root
    global entry
    global scale
    
    global tree_
    global result_
    global text_
    global index
    global display
    
    global var_scale
    
    global top_label
    global comment_button1
    global comment_button2
    global comment_button3
    global pic_label1
    global pic_label2
    global pic_label3
    global title_label1
    global title_label2
    global title_label3
    global info_label1
    global info_label2
    global info_label3
    global abstract_label1
    global abstract_label2
    global abstract_label3
    global page_mark
    
    width = 1280
    height = 720
    
    index = 0
    tree_ = tree
    result_ = result
    text_ = text
    display = result.name[0:3]
    
    root = tk.Tk()
    
    # Hiden title and put at the center
    root.overrideredirect(True)
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    root.geometry("%dx%d+%d+%d" % (width, height, x, y))
    
    # Background picture
    bg_dir = '..\\src\\result_background.gif'
    bg_pic = tk.PhotoImage(file = bg_dir)
    background_label = tk.Label(root, image = bg_pic, compound = tk.CENTER)
    background_label.pack()
    background_label.bind('<MouseWheel>', on_mouse_wheel)
    
    # Search entry
    entry = tk.Entry(root, relief = 'flat', font = ('微软雅黑', 15))
    entry.insert('end', text)
    entry.place(x = 315, y = 25, width = 650, height = 35)
    entry.bind('<Return>', on_search)
    
    # Search Button
    search_pic = tk.PhotoImage(file = '..\\src\\search_pink.gif')
    search_button = tk.Button(root, image = search_pic, relief = 'flat')
    search_button.place(x = 980, y = 25, width = 35, height = 35)
    search_button.bind('<Button-1>', on_search)
    
    # RadioButtons
    var_rb = IntVar()
    rb_default = tk.Radiobutton(root, text = '默认排序', variable = var_rb, 
                                value = 0, bg = '#ffffff', 
                                font = ('黑体',  12))
    rb_default.place(x = 20, y = 150, width = 200, height = 30)
    rb_default.bind('<Button-1>', on_check_default)
    rb_default.bind('<MouseWheel>', on_mouse_wheel)
    rb_play = tk.Radiobutton(root, text = '按播放量排序', variable = var_rb,
                             value = 1, bg = '#ffffff', 
                             font = ('黑体',  12))
    rb_play.place(x = 20, y = 190, width = 200, height = 30)
    rb_play.bind('<Button-1>', on_check_play)
    rb_play.bind('<MouseWheel>', on_mouse_wheel)
    rb_dmNUM = tk.Radiobutton(root, text = '按弹幕数排序', variable = var_rb,
                              value = 2, bg = '#ffffff', 
                              font = ('黑体',  12))
    rb_dmNUM.place(x = 20, y = 230, width = 200, height = 30)
    rb_dmNUM.bind('<Button-1>', on_check_play)
    rb_dmNUM.bind('<MouseWheel>', on_mouse_wheel)
    rb_sex = tk.Radiobutton(root, text = '按观众性别分布排序', variable = var_rb,
                            value = 3, bg = '#ffffff', 
                            font = ('黑体',  12))
    rb_sex.place(x = 20, y = 270, width = 200, height = 30)
    rb_sex.bind('<Button-1>', on_check_sex)
    rb_sex.bind('<MouseWheel>', on_mouse_wheel)
    
    # Scale
    var_scale = DoubleVar()
    scale = tk.Scale(root, orient = HORIZONTAL, length = 180, from_ = 0.0, 
                     to = 100.0, resolution = 0.1, variable = var_scale, 
                     bg = '#ffffff', relief = 'flat', state = DISABLED)
    scale.place(x = 30, y = 310)
    scale.bind('<Button-1>', on_click_scale)
    scale.bind('<B1-Motion>', on_click_scale)
    scale.bind('<ButtonRelease-1>', on_click_scale)
    scale.place_forget()
    
    # Buttons
    pre_text = '上一页'
    pre_button = HoverButton(root, 
                              text = pre_text,
                              font = ('华文琥珀', 14),
                              fg = '#ffffff',
                              background = '#00d0ff', 
                              activebackground = '#e11e88',
                              relief = 'flat')
    pre_button.place(x = 616, y = 680, width = 158, height = 38)
    pre_button.bind('<Button-1>', on_click_pre_button)
    pre_button.bind('<MouseWheel>', on_mouse_wheel)
    
    next_text = '下一页'
    next_button = HoverButton(root, 
                              text = next_text,
                              font = ('华文琥珀', 14),
                              fg = '#ffffff',
                              background = '#00d0ff', 
                              activebackground = '#e11e88',
                              relief = 'flat')
    next_button.place(x = 952, y = 680, width = 158, height = 38)
    next_button.bind('<Button-1>', on_click_next_button)
    next_button.bind('<MouseWheel>', on_mouse_wheel)
    
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
    exit_button.bind('<MouseWheel>', on_mouse_wheel)
    
    # Main frame initialize
    comment_button1 = HoverButton(root, 
                                  text = '查看评论',
                                  font = ('宋体', 12),
                                  fg = '#ffffff',
                                  background = '#00d0ff', 
                                  activebackground = '#e11e88',
                                  relief = 'flat')
    comment_button1.place(x = 280, y = 275, width = 100, height = 20)
    comment_button1.bind('<Button-1>', on_click_comments1)
    comment_button1.bind('<MouseWheel>', on_mouse_wheel)
    
    comment_button2 = HoverButton(root, 
                                  text = '查看评论',
                                  font = ('宋体', 12),
                                  fg = '#ffffff',
                                  background = '#00d0ff', 
                                  activebackground = '#e11e88',
                                  relief = 'flat')
    comment_button2.place(x = 280, y = 435, width = 100, height = 20)
    comment_button2.bind('<Button-1>', on_click_comments2)
    comment_button2.bind('<MouseWheel>', on_mouse_wheel)
    
    comment_button3 = HoverButton(root, 
                                  text = '查看评论',
                                  font = ('宋体', 12),
                                  fg = '#ffffff',
                                  background = '#00d0ff', 
                                  activebackground = '#e11e88',
                                  relief = 'flat')
    comment_button3.place(x = 280, y = 595, width = 100, height = 20)
    comment_button3.bind('<Button-1>', on_click_comments3)
    comment_button3.bind('<MouseWheel>', on_mouse_wheel)
    
    if len(text) <= 25:
        top_text = '检索“' + text + '”共得到' + str(len(result.name)) + '条结果。'
    else:
        top_text = '检索“' + text[:25] + '...' + '”共得到' + str(len(result.name)) + '条结果。'
    top_label = tk.Text(root, font = ('楷体', 14), bg = '#ffffff', relief = 'flat')
    top_label.place(x = 280, y = 120, width = 925, height = 30)
    top_label.insert(1.0, top_text)
    
    if len(result.name) >= 1:
        pic1 = tk.PhotoImage(file = '..\\database\\' + result.tag + '\\' + result.name[0] + '\\'
                             + result.name[0] + '-thumb.gif')
    else:
        pic1 = tk.PhotoImage(file = '..\\src\\blank.gif')
        comment_button1.place_forget()
    pic_label1 = tk.Label(root, bg = '#ffffff', image = pic1)
    pic_label1.place(x = 280, y = 170, width = 160, height = 100)
    pic_label1.bind('<MouseWheel>', on_mouse_wheel)
    
    if len(result.name) >= 2:
        pic2 = tk.PhotoImage(file = '..\\database\\' + result.tag + '\\' + result.name[1] + '\\'
                             + result.name[1] + '-thumb.gif')
    else:
        pic2 = tk.PhotoImage(file = '..\\src\\blank.gif')
        comment_button2.place_forget()
    pic_label2 = tk.Label(root, bg = '#ffffff', image = pic2)
    pic_label2.place(x = 280, y = 330, width = 160, height = 100)
    pic_label2.bind('<MouseWheel>', on_mouse_wheel)
    
    if len(result.name) >= 3:
        pic3 = tk.PhotoImage(file = '..\\database\\' + result.tag + '\\' + result.name[2] + '\\'
                             + result.name[2] + '-thumb.gif')
    else:
        pic3 = tk.PhotoImage(file = '..\\src\\blank.gif')
        comment_button3.place_forget()
    pic_label3 = tk.Label(root, bg = '#ffffff', image = pic3)
    pic_label3.place(x = 280, y = 490, width = 160, height = 100)
    pic_label3.bind('<MouseWheel>', on_mouse_wheel)
    
    text1 = result.name[0] if len(result.name) >= 1 else ''
    title_label1 = tk.Text(root, font = ('微软雅黑', 16, BOLD), bg = '#ffffff', relief = 'flat')
    title_label1.place(x = 450, y = 170, width = 750, height = 30)
    title_label1.insert(1.0, text1)
    title_label1.bind('<MouseWheel>', on_mouse_wheel)
    
    text2 = result.name[1] if len(result.name) >= 2 else ''
    title_label2 = tk.Text(root, font = ('微软雅黑', 16, BOLD), bg = '#ffffff', relief = 'flat')
    title_label2.place(x = 450, y = 330, width = 750, height = 30)
    title_label2.insert(1.0, text2)
    title_label2.bind('<MouseWheel>', on_mouse_wheel)
    
    text3 = result.name[2] if len(result.name) >= 3 else ''
    title_label3 = tk.Text(root, font = ('微软雅黑', 16, BOLD), bg = '#ffffff', relief = 'flat')
    title_label3.place(x = 450, y = 490, width = 750, height = 30)
    title_label3.insert(1.0, text3)
    title_label3.bind('<MouseWheel>', on_mouse_wheel)
    
    (info1, abstract1) = load_info(result.tag, result.name[0]) if len(result.name) >= 1 else ('', '')
    info_label1 = tk.Text(root, font = ('宋体', 9, BOLD), bg = '#ffffff', relief = 'flat')
    info_label1.place(x = 450, y = 205, width = 750, height = 18, anchor = 'nw')
    info_label1.insert(1.0, info1)
    info_label1.bind('<MouseWheel>', on_mouse_wheel)
    
    (info2, abstract2) = load_info(result.tag, result.name[1]) if len(result.name) >= 2 else ('', '')
    info_label2 = tk.Text(root, font = ('宋体', 9, BOLD), bg = '#ffffff', relief = 'flat')
    info_label2.place(x = 450, y = 365, width = 750, height = 18, anchor = 'nw')
    info_label2.insert(1.0, info2)
    info_label2.bind('<MouseWheel>', on_mouse_wheel)
    
    (info3, abstract3) = load_info(result.tag, result.name[2]) if len(result.name) >= 3 else ('', '')
    info_label3 = tk.Text(root, font = ('宋体', 9, BOLD), bg = '#ffffff', relief = 'flat')
    info_label3.place(x = 450, y = 525, width = 750, height = 18, anchor = 'nw')
    info_label3.insert(1.0, info3)
    info_label3.bind('<MouseWheel>', on_mouse_wheel)
    
    abstract_label1 = tk.Text(root, font = ('宋体', 10), bg = '#ffffff', relief = 'flat')
    abstract_label1.place(x = 450, y = 225, width = 750, height = 70, anchor = 'nw')
    abstract_label1.insert(1.0, abstract1)
    abstract_label1.bind('<MouseWheel>', on_mouse_wheel)
    
    abstract_label2 = tk.Text(root, font = ('宋体', 10), bg = '#ffffff', relief = 'flat')
    abstract_label2.place(x = 450, y = 385, width = 750, height = 70, anchor = 'nw')
    abstract_label2.insert(1.0, abstract2)
    abstract_label2.bind('<MouseWheel>', on_mouse_wheel)
    
    abstract_label3 = tk.Text(root, font = ('宋体', 10), bg = '#ffffff', relief = 'flat')
    abstract_label3.place(x = 450, y = 545, width = 750, height = 70, anchor = 'nw')
    abstract_label3.insert(1.0, abstract3)
    abstract_label3.bind('<MouseWheel>', on_mouse_wheel)
    
    page_text = '第 1 / ' + str(max(1, math.ceil(len(result.name) / 3))) + ' 页'
    page_mark = tk.Button(root, font = ('微软雅黑', 12), bg = '#cccccc', relief = 'flat', text = page_text)
    page_mark.place(x = 784, y = 680, width = 158, height = 38)
    page_mark.bind('<Button-1>', on_click_page_mark)
    page_mark.bind('<MouseWheel>', on_mouse_wheel)
    
    root.mainloop()

if __name__ == '__main__':
    main(searchEngine.setupTree(), '', searchEngine.Anime())