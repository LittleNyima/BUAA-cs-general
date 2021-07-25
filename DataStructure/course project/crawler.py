# -*- coding:utf-8 -*-
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import requests
import jieba
import json
import os
#import re

class Crawler:
    def __init__(self):
        self.driver = webdriver.Firefox()
        self.driver1 = webdriver.Firefox()
        self.wait = WebDriverWait(self.driver, 10)
        self.url = 'https://www.bilibili.com/v/anime/finish/#/all/default/0/'
        self.maxpage = 782
    
    def open_page(self, pageindex = 0):
        url = self.url + str(pageindex) + '/'
        self.driver.get(url)
    
    def get_response(self):
        driver = self.driver
        wait = self.wait
        try:
            wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '#videolist_box > div.vd-list-cnt'))
            )
            wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR,'#videolist_box > div.vd-list-cnt > ul > li:nth-child(1) > div > div.r'))
            )
            wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR,'#videolist_box > div.vd-list-cnt > ul > li:nth-child(1) > div > div.l'))
            )
        except TimeoutException:
            raise TimeoutException
        page = driver.page_source
        soup = BeautifulSoup(page,'html.parser')
        items = soup.find_all('div',class_ = 'l-item')
        for item in items:
            try:
                info = dict()
                item1 = item.find_all('span',class_ = 'v-info-i')
                img = item.find_all('img')
                img = str(img).split('src="//')
                img = img[-1].split('"')
                img = 'http://' + img[0]
                thumb = requests.get(img)
                av = str(item.find_all('a',class_ = 'title')[0])
                av = av.split('" target=')
                av = av[0].split('av')[-1]
                l = []
                driver1 = self.driver1
                for pn in range(1,10):
                    url1 = 'https://api.bilibili.com/x/v2/reply?&type=1&pn=' + str(pn) + '&oid=' + str(av)
                    driver1.get(url1)
                    l.append(driver1.page_source)
                info['番剧名'] = item.find('a',class_ = 'title').text
                info['播放量'] = item1[0].text
                info['弹幕数'] = item1[1].text
                info['简介'] = item.find('div', class_ = 'v-desc').text
                tag_list = jieba.cut(info['番剧名'], cut_all = False)
                for tag in tag_list:
                    dir_ = '..\\database\\' + tag + '\\' + info['番剧名']
                    if not os.path.isdir(dir_):
                        os.makedirs(dir_)
                    info_filename = dir_ + '\\' + info['番剧名'] + '-info.txt'
                    img_filename = dir_ + '\\' + info['番剧名'] + '-thumb.png'
                    #tmp_filename = dir_ + '\\' + info['番剧名'] + 'tmp'
                    comment_filename = dir_ + '\\' + info['番剧名'] + '-comments.txt'
                    fp = open(info_filename, 'w')
                    fp.write(json.dumps(info))
                    fp.close()
                    fp = open(img_filename, 'wb')
                    fp.write(thumb.content)
                    fp.close()
                    fp = open(comment_filename, 'w', encoding = 'utf-8')
                    for i in l:
                        fp.write(i)
                    fp.close()
            except:
                pass
            
    def next_page(self):
        try:
            button = self.wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR,'#videolist_box > div.vd-list-cnt > div.pager.pagination > ul > li.page-item.next > button'))
            )
        except TimeoutException:
            raise TimeoutException
        button.click()
    
    def main(self):
        driver = self.driver
        bilibili.open_page()
        for i in range(self.maxpage - 1):
            i = i
            bilibili.get_response()
            bilibili.next_page()
        driver.quit()
        
if __name__ == '__main__':
    bilibili = Crawler()
    bilibili.main()