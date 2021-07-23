import numpy as np
import pandas as pd
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score,mean_squared_error
from sklearn.ensemble import RandomForestRegressor

data = pd.read_csv("train.csv")

sex_mapping = {"male" : 0, "female" : 1}
smoker_mapping = {"yes" : 1, "no" : 0}
region_mapping = {"northeast" : 0, "southeast" : 1, "southwest" : 2, "northwest" : 3}

data["sex"] = data["sex"].map(sex_mapping)
data["smoker"] = data["smoker"].map(smoker_mapping)
data["region"] = data["region"].map(region_mapping)

x = data.drop(["charges"], axis = 1)
y = data.charges

quad = PolynomialFeatures(degree = 2)
x_quad = quad.fit_transform(x)

lr = LinearRegression().fit(x_quad, y)

test = pd.read_csv("test_sample.csv")

test["sex"] = test["sex"].map(sex_mapping)
test["smoker"] = test["smoker"].map(smoker_mapping)
test["region"] = test["region"].map(region_mapping)

test_x = test.drop(["charges"], axis = 1)
test_x_quad = quad.fit_transform(test_x)
test_pred = lr.predict(test_x_quad)
print(test.shape, test_x.shape, test_pred.shape)

test["charges"] = test_pred

test.to_csv("submission.csv")