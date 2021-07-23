# create data and label for FER2013
# labels: 0=Angry, 1=Disgust, 2=Fear, 3=Happy, 4=Sad, 5=Surprise, 6=Neutral
import csv
import os
import numpy as np
import h5py
from skimage import io

test_dir = "data/test"

# Creat the list to store the data and label information
PublicTest_x = []
PublicTest_y = []
PrivateTest_x = []
PrivateTest_y = []

datapath = os.path.join('data','data_ml.h5')
if not os.path.exists(os.path.dirname(datapath)):
    os.makedirs(os.path.dirname(datapath))

for file in os.listdir(test_dir):
    filepath = os.path.join(test_dir, file)
    num = int(file.split(".")[0].split("_")[-1])
    img = io.imread(filepath)
    temp_list = []
    for i in img:
        for j in i:
            temp_list.append(int(j))
    I = np.asarray(temp_list)
    if (file.startswith("PublicTest")):
        PublicTest_y.append(num)
        PublicTest_x.append(I.tolist())
    elif (file.startswith("PrivateTest")):
        PrivateTest_y.append(num)
        PrivateTest_x.append(I.tolist())

print(np.shape(PublicTest_x))
print(np.shape(PrivateTest_x))

datafile = h5py.File(datapath, 'w')
datafile.create_dataset("PublicTest_pixel", dtype = 'uint8', data=PublicTest_x)
datafile.create_dataset("PublicTest_num", dtype = 'int64', data=PublicTest_y)
datafile.create_dataset("PrivateTest_pixel", dtype = 'uint8', data=PrivateTest_x)
datafile.create_dataset("PrivateTest_num", dtype = 'int64', data=PrivateTest_y)
datafile.close()

print("Save data finish!!!")
