#!/usr/bin/env python
# coding: utf-8

# ***

# In[1]:


import numpy as np 
import pandas as pd 
import os
import matplotlib.pyplot as pl
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')
pl.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
pl.rcParams['axes.unicode_minus']=False #用来正常显示负号


# In[2]:


data = pd.read_csv('./insurance.csv')



# In[3]:


data.head()


# In[4]:


data.isnull().sum()



# In[5]:


sex_mapping = {
           'male': 0,
           'female': 1}
smoker_mapping = {
           'yes': 1,
           'no': 0}
region_mapping = {
           'northeast': 0,
           'southeast': 1,
           'southwest': 2,
           'northwest': 3}
data['sex'] = data['sex'].map(sex_mapping)
data['smoker'] = data['smoker'].map(smoker_mapping)
data['region'] = data['region'].map(region_mapping)

data.head()


# In[6]:


data.corr(method ='pearson',min_periods = 1)['charges'].sort_values() 


# In[7]:


f, ax = pl.subplots(figsize=(10, 8))
corr = data.corr(method ='pearson',min_periods = 1).abs()
sns.heatmap(corr, mask=np.zeros_like(corr, dtype=np.bool), cmap=sns.diverging_palette(240,10,as_cmap=True),
            square=True, ax=ax)



# In[8]:


sex_mapping = {
           0: u"男",
           1: u"女"}
smoker_mapping = {
           1: u"吸烟者",
           0: u"非吸烟者"}
region_mapping = {
           0:u"东北",
           1:u"东南",
           2:u"西南",
           3:u"西北"}
data['年龄'] = data['age']
data['性别'] = data['sex'].map(sex_mapping)
data['保险覆盖家人数'] = data['children']
data['是否吸烟'] = data['smoker'].map(smoker_mapping)
data['所在区域'] = data['region'].map(region_mapping)
data['医疗支出'] = data['charges']

print(data.head())



# In[9]:


from bokeh.io import output_notebook, show
from bokeh.plotting import figure
output_notebook()
import scipy.special
from bokeh.layouts import gridplot
from bokeh.plotting import figure, show, output_file
p = figure(title=u"医疗支出分布直方图",tools="save",
            background_fill_color="#E8DDCB")
hist, edges = np.histogram(data.charges) #转化为直方图
p.quad(top=hist, bottom=0, left=edges[:-1], right=edges[1:],
        fill_color="#036564", line_color="#033649")
p.xaxis.axis_label = u'医疗支出'
p.yaxis.axis_label = u'频数'
show(gridplot(p,ncols = 2, plot_width=400, plot_height=400, toolbar_location=None))



# In[10]:


f= pl.figure(figsize=(12,5))

ax=f.add_subplot(121)
sns.distplot(data[(data.smoker == 1)]['医疗支出'],color='c',ax=ax)
ax.set_title(u'吸烟者的医疗支出概率分布')

ax=f.add_subplot(122)
sns.distplot(data[(data.smoker == 0)]['医疗支出'],color='b',ax=ax)
ax.set_title(u'非吸烟者的医疗支出概率分布')



# In[11]:


sns.catplot(x="是否吸烟", kind="count", hue = '性别', palette="pink", data=data)



# In[12]:


sns.catplot(x="性别", y="医疗支出", hue="是否吸烟",
            kind="violin", split=True, data=data, palette = 'magma')


# In[13]:


pl.figure(figsize=(12,5))
pl.title(u"女性的医疗支出箱型图")
sns.boxplot(y="是否吸烟", x="医疗支出", data =  data[(data.sex == 1)] , orient="h", palette = 'magma')


# In[14]:


pl.figure(figsize=(12,5))
pl.title(u"男性的医疗支出箱型图")
sns.boxplot(y="是否吸烟", x="医疗支出", data =  data[(data.sex == 0)] , orient="h", palette = 'rainbow')



# In[15]:


pl.figure(figsize=(12,5))
pl.title("年龄概率分布")
ax = sns.distplot(data["年龄"], color = 'g')



# In[16]:


sns.catplot(x="是否吸烟", kind="count",hue = '性别', palette="rainbow", data=data[(data.age == 18)])
pl.title("18岁人群中吸烟人与非吸烟人的数量")


# In[17]:


pl.figure(figsize=(12,5))
pl.title("18岁人群关于吸不吸烟两种情况下医疗支出箱线图")
sns.boxplot(y="是否吸烟", x="医疗支出", data = data[(data.age == 18)] , orient="h", palette = 'pink')



# In[18]:


g = sns.jointplot(x="年龄", y="医疗支出", data = data[(data.smoker == 0)],kind="kde", color="m")
g.plot_joint(pl.scatter, c="w", s=30, linewidth=1, marker="+")
g.ax_joint.collections[0].set_alpha(0)
#g.set_axis_labels("$年龄$", "$医疗支出$")
ax.set_title('非吸烟者的年龄、医疗支出分布情况')



# In[19]:


g = sns.jointplot(x="年龄", y="医疗支出", data = data[(data.smoker == 1)],kind="kde", color="c")
g.plot_joint(pl.scatter, c="w", s=30, linewidth=1, marker="+")
g.ax_joint.collections[0].set_alpha(0)
#g.set_axis_labels("$age$", "$charges$")
ax.set_title('吸烟者的年龄、医疗支出分布情况')



# In[20]:


pl.figure(figsize=(12,5))
pl.title("数据中的bmi概率分布")
ax = sns.distplot(data["bmi"], color = 'm')



# In[21]:


pl.figure(figsize=(12,5))
pl.title("BMI大于30人群的医疗支出概率分布")
ax = sns.distplot(data[(data.bmi >= 30)]['医疗支出'], color = 'm')


# In[22]:


pl.figure(figsize=(12,5))
pl.title("BMI小于30人群的医疗支出概率分布")
ax = sns.distplot(data[(data.bmi < 30)]['医疗支出'], color = 'b')



# In[23]:


g = sns.jointplot(x="bmi", y="医疗支出", data = data,kind="kde", color="r")
g.plot_joint(pl.scatter, c="w", s=30, linewidth=1, marker="+")
g.ax_joint.collections[0].set_alpha(0)
#g.set_axis_labels("$bmi$", "$charges$")
ax.set_title('bmi和charges的联合分布')


# In[24]:


pl.figure(figsize=(10,6))
ax = sns.scatterplot(x='bmi',y='医疗支出',data=data,palette='magma',hue='是否吸烟')
ax.set_title('charges与bmi二维散点图')

sns.lmplot(x="bmi", y="医疗支出", hue="是否吸烟", data=data, palette = 'magma', size = 8)



# In[25]:


sns.catplot(x="保险覆盖家人数", kind="count", palette="ch:.25", data=data, size = 6)
pl.title("保险覆盖家人数分布")



# In[26]:


sns.catplot(x="是否吸烟", kind="count", palette="rainbow",hue = "性别",
            data=data[(data.children > 0)], size = 6)
ax.set_title('吸烟者 VS 非吸烟者 之 健康保险覆盖家人数量比对')
