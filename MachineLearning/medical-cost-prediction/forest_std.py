import numpy as np
import pandas as pd
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures, scale
from sklearn.metrics import r2_score,mean_squared_error
from sklearn.ensemble import RandomForestRegressor

data = pd.read_csv("train.csv")

train_size = 1070

sex_mapping = {"male" : 0, "female" : 1}
smoker_mapping = {"yes" : 1, "no" : 0}
region_mapping = {"northeast" : 0, "southeast" : 1, "southwest" : 2, "northwest" : 3}

average = {"age":39.20703, "sex":0.494768, "bmi":30.6634, "children":1.094918, "smoker":0.204783, "region":1.486547, "charges":13270.42}
std = {"age":14.4471, "sex":0.499973, "bmi":6.095908, "children":1.205042, "smoker":0.403543, "region":1.104502, "charges":12105.48}

data["sex"] = data["sex"].map(sex_mapping)
data["smoker"] = data["smoker"].map(smoker_mapping)
data["region"] = data["region"].map(region_mapping)

for k in average.keys():
    data[k] = (data[k] - average[k]) / std[k]

x = data.drop(["charges"], axis = 1)
y = data.charges

quad = PolynomialFeatures(degree = 3)
x_quad = quad.fit_transform(x)

forest = RandomForestRegressor(n_estimators = 100,
                              criterion = 'mse',
                              random_state = 1,
                              n_jobs = -1)

lr = forest.fit(x_quad, y)

test = pd.read_csv("test_sample.csv")

test["sex"] = test["sex"].map(sex_mapping)
test["smoker"] = test["smoker"].map(smoker_mapping)
test["region"] = test["region"].map(region_mapping)


for k in average.keys():
    test[k] = (test[k] - average[k]) / std[k]

test_x = test.drop(["charges"], axis = 1)
test_x_quad = quad.fit_transform(test_x)
test_pred = lr.predict(test_x_quad)
print(test.shape, test_x.shape, test_pred.shape)

test["charges"] = test_pred

csv = pd.read_csv("test_sample.csv")

csv["charges"] = test_pred * std["charges"] + average["charges"]
csv.to_csv("submission.csv")
