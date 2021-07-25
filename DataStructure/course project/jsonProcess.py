# -*- coding:utf-8 -*-
import json
import re
import os
import time
import shutil
#import requests

def json2dict(anime_dir, aim_dir):
    src = open(aim_dir, 'r', encoding = 'UTF-8')
    name = aim_dir[:-13]
    destiny = name + '-userdata.txt'
    write = open(destiny, 'w', encoding = 'UTF-8')
    contents = src.readline()
    pattern = r'<div id="json">.+?</div>'
    search_result = re.findall(pattern, contents)
    src.close()
    '''avatar_dir = anime_dir + '\\avatars\\'
    if not os.path.exists(avatar_dir):
        os.makedirs(avatar_dir)'''
    sex_ = dict()
    sex_['male'] = 0
    sex_['female'] = 0
    sex_['secret'] = 0
    try:
        for result in search_result:
            result = result[15:-6]
            dic = json.loads(result)
            for reply in dic['data']['replies']:
                if reply['member']['sex'] == '男':
                    sex_['male'] = sex_['male'] + 1
                elif reply['member']['sex'] == '女':
                    sex_['female'] = sex_['female'] + 1
                else:
                    sex_['secret'] = sex_['secret'] + 1
                data = dict()
                data["uname"] = reply['member']['uname']
                data["sex"] = reply['member']['sex']
                sign_split = reply['member']['sign'].split('\n')
                sign = ''
                for sp in sign_split[:-1]:
                    sign = sign + sp + '    '
                sign = sign + sign_split[-1]
                data["sign"] = sign
                data["avatar"] = reply['member']['avatar']
                message_split = reply['content']['message'].split('\n')
                message = ''
                for sp in message_split[:-1]:
                    message = message + sp + '    '
                message = message + message_split[-1]
                data["message"] = message
                time_ = time.localtime(reply['ctime'])
                time_str = time.strftime('%Y-%m-%d %H:%M:%S', time_)
                data["time"] = time_str
                data["ctime"] = str(reply['ctime'])
                str_dict = json.dumps(data)
                write.write(str_dict)
                write.write('\n')
                '''write.write('{"uname" : ')
                write.write('"')
                write.write(reply['member']['uname'])
                write.write('"')
                write.write(', "sex" : ')
                write.write('"')
                write.write(reply['member']['sex'])
                write.write('"')
                write.write(', "sign" : ')
                sign_split = reply['member']['sign'].split('\n')
                write.write('"')
                for split in sign_split:
                    write.write(split)
                    write.write('    ')
                write.write('"')
                write.write(', "avatar" : ')
                write.write('"')
                write.write(reply['member']['avatar'])
                write.write('"')
                write.write(', "message" : ')
                message_split = reply['content']['message'].split('\n')
                write.write('"')
                for split in message_split:
                    write.write(split)
                    write.write('    ')
                write.write('"')
                write.write(', "time" : ')
                time_ = time.localtime(reply['ctime'])
                time_str = time.strftime('%Y-%m-%d %H:%M:%S', time_)
                write.write('"')
                write.write(time_str)
                write.write('"')
                write.write(', "ctime" : ')
                write.write('"')
                write.write(str(reply['ctime']))
                write.write('"')
                write.write("}\n")'''
                
                ''' avatar_src = reply['member']['avatar']
                avatar = avatar_dir + reply['member']['uname'] + '.png'
                avatar_pic = requests.get(avatar_src)
                avatar_fp = open(avatar, 'wb')
                avatar_fp.write(avatar_pic.content)
                avatar_fp.close()'''
    except:
        pass
    write.close()
    destiny = name + '-info.txt'
    write = open(destiny, 'a', encoding = 'UTF-8')
    write.write('\n')
    write.write(json.dumps(sex_))
    write.close()

if __name__ == '__main__':
    db_dir = '..\\database\\'
    tags = os.listdir(db_dir)
    pattern = r'.+comments.txt'
    for tag in tags:
        tag_dir = db_dir + tag
        animations = os.listdir(tag_dir)
        for anime in animations:
            anime_dir = tag_dir + '\\' +anime
            print(anime_dir)
            if os.path.isdir(anime_dir):
                files = os.listdir(anime_dir)
                aim = []
                for file in files:
                    aim = aim + re.findall(pattern, file)
                if not aim == []:
                    aim_dir = anime_dir + '\\' + aim[0]
                    json2dict(anime_dir, aim_dir)
                else:
                    try:
                        shutil.rmtree(anime_dir)
                    except:
                        pass
    print('done')