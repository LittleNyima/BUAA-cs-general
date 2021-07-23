# BUAA_ML_2020

### 介绍

BUAA机器学习导论大作业（2020）

### 选题及代码说明

* 人脸表情分类

    代码位于`./face-emotion-recognition/`，使用pytorch实现。

    （参考了[WuJie1010](https://github.com/WuJie1010)/**[Facial-Expression-Recognition.Pytorch](https://github.com/WuJie1010/Facial-Expression-Recognition.Pytorch)**）

* 医疗花费预测

    代码位于`./medical-cost-prediction/`，使用scikit-learn实现。

    其中，不同文件代表不同的方法，`forest.py`对应随机森林方法，`forest_std.py`对应带标准化的随机森林方法，`linear.py`代表线性回归法。

    `visualize.py`是用于对数据进行可视化的脚本，由jupyter notebook转换而来。

### 结果

截至2021年1月3日 22:35:33，平台leader board排名分别为：

* 人脸表情分类：2 / 97
* 医疗花费预测：7 / 114

