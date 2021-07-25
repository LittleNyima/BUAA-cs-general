#提取目录下所有图片,更改尺寸后保存到另一目录
from PIL import Image
import os.path
import os
import glob
def convertjpg(jpgfile,outdir,width=160,height=100):
    img=Image.open(jpgfile)
    try:
        new_img=img.resize((width,height),Image.BILINEAR)
        a = os.path.join(outdir,os.path.basename(jpgfile))
        new_img.save(jpgfile[:-4] + '.gif')
        print(jpgfile)
    except Exception as e:
        print(e)
for jpgfile in glob.glob("D:\\workplace\\2019B\\DS\\course design\\database\\*\\*\\*"):
    try:
        convertjpg(jpgfile,"D:\\workplace\\2019B\\DS\\course design\\pic\\")
    except:
        pass
