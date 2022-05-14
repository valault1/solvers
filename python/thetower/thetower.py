


attackValues = {}
COLUMN="Health Cost"

real_values = open('data/statdata.csv', 'r')
columns = real_values.readline().split(',')
columnIndex = columns.index(COLUMN)
y = []
for line in real_values.readlines():
  vals = line.split(',')
  if vals[columnIndex] != "":
    y.append(int(vals[columnIndex]))
#print(y)


cachedValues = {1: y[0]}

def predictValue(x):
  if x in cachedValues: return cachedValues[x]
  last_result = predictValue(x-1)
  result = last_result + (last_result * (1/(.1* x ** -2 + 4)))
  return result
  


for n in range(len(y)):
  x = n + 1
  print(x, y[n], predictValue(x))