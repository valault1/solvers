word = "kkkk"
word = s
anagramsCount = {}
count = 0
# finds all substrings of len n, and checks them for anagrams
def addAllSubstringsOfLen(word, n):
    countToAdd = 0
    substrings = []
    for i in range(len(word) - n + 1):
        substring = ''.join(sorted(word[i:i+n]))
        substrings.append(substring)
    for i in range(len(substrings) - 1):
        for j in range(i+1, len(substrings)):
            if substrings[i] == substrings[j]:
                countToAdd += 1
    return countToAdd
    



for i in range(1, len(word)):
    count += addAllSubstringsOfLen(word, i)
return count