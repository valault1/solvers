import random

num_lists = 300
list_len = 10
min_num = 1
max_num = 30






lists = []
for i in range(num_lists):
  number_pool = list(range(min_num, max_num + 1))
  result = []
  for j in range(list_len):
    num_to_add = number_pool.pop(random.randint(0, len(number_pool) - 1))
    pair_num = num_to_add + (max_num / 2)
    if pair_num > max_num:
      pair_num -= max_num
    pair_num = int(pair_num)

    number_pool.pop(number_pool.index(pair_num))
    result.append(num_to_add)
  lists.append(result)

for l in lists:
  for item in l:
    print("%s,"%item, end='')
  print()
  
  