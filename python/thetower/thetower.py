real_values = open('data/alldata.csv', 'r')
real_values.readline()

cachedAttackValues = {1: 1.18}
attackValues = {}
defenseValues = {}
for line in real_values.readlines():
  vals = line.split(',')
  attackValues[vals[0]] = vals[1]
  defenseValues[vals[0]] = vals[2]


def getAttack(x):
  if x in cachedAttackValues:
    return cachedAttackValues[x]
  if x % 10 == 0: 
    result = getAttack(x - 1) * (.01* x) ** 4
    cachedAttackValues[x] = result
    return result
  if x % 5 == 0: 
    result = getAttack(x - 1) * x ** 3
    cachedAttackValues[x] = result
    return result
  result = getAttack(x - 1) * x ** 2
  cachedAttackValues[x] = result
  return result



for (wave, attack) in attackValues.items():
  print(wave, attack, getAttack(int(wave)))