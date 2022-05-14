import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

DEGREE=(2,10)
COLUMN="cash bonus increase %"

real_values = open('data/statdata.csv', 'r')
columns = real_values.readline().split(',')
columnIndex = columns.index(COLUMN)
y = []
for line in real_values.readlines():
  vals = line.split(',')
  if vals[columnIndex] != "":
    y.append(vals[columnIndex])
print(y)



#y = [3, 4, 5, 7, 10, 8, 9, 10, 10, 23, 27, 44, 50, 63, 67, 60, 62, 70, 75, 88, 81, 87, 95, 100, 108, 135, 151, 160, 169, 179]
x = np.arange(0, len(y))

#plt.figure(figsize=(10,6))
#plt.scatter(x, y)
#plt.show()

from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=DEGREE, include_bias=False)
poly_features = poly.fit_transform(x.reshape(-1, 1))

poly_reg_model = LinearRegression()
poly_reg_model.fit(poly_features, y)
y_predicted = poly_reg_model.predict(poly_features)



plt.figure(figsize=(10, 6))
plt.title("Your first polynomial regression - congrats! :)", size=16)
#plt.xticks(np.arange(min(x), max(x)+1, .01))
plt.xticks(np.arange(1, 3, .01))

plt.scatter(x, y)
plt.plot(x, y_predicted, c="red")
plt.show()