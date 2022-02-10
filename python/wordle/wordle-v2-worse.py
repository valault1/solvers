import collections
from ctypes.wintypes import WORD
import random
from datetime import datetime
from tracemalloc import start
from itertools import combinations_with_replacement
from wordleWords import allWords

def getWords():
  global words
  global frequencies
  with open('original_words.txt') as f:
    lines = f.readlines()
  trimmed_lines = []
  for line in lines:
    trimmed_lines.append(line.strip())

  filtered_words = []
  for word in trimmed_lines:
    if len(word) == 5:
      filtered_words.append(word)

  output = "["
  for word in filtered_words:
    output += "\"%s\"," % word
  output = output[:-1] + "]"
  if writeFile:
    with open('filtered_words.txt', 'w') as f:
      f.write(output)
      f.close()
  words = output[1:-1].split(",")
  for i in range(len(words)):
    words[i] = words[i][1:-1]
  
  for word in filtered_words:
    for letter in word:
      if letter in frequencies:
        frequencies[letter] += 1
      else:
        frequencies[letter] = 1

  sorted_dict = sorted(frequencies.items(), key=lambda x: x[1], reverse=True)
  for k, v in sorted_dict:
    #print(k)
    pass

def validateGuess(guess):
  allowedColors = ['b', 'y', 'g']
  if type(guess) != str:
    return False, "That is not a valid string."
  guessArr = guess.split(" ")
  if len(guessArr) != 2: 
    return False, "Enter only 2 words."
  if len(guessArr[0]) != 5 or len(guessArr[1]) != 5:
    return False, "Each word entered must be 5 letters."
  if not guessArr[0].isalpha():
    return False, "Enter only letters."
  if guessArr[0] != guessArr[0].lower():
    return False, "Enter only lowercase letters."
  for color in guessArr[1]:
    if color not in allowedColors:
      return False, "The second part must only be 'b', 'y', or 'g'"
  return True, ""

def generateColors(guess, wordToGuess):
  colors = ['b','b','b','b','b']
  wordToGuessCopy = [letter for letter in wordToGuess]
  guessCopy = [letter for letter in guess]
  for i in range(len(guess)):
    if guessCopy[i] == wordToGuessCopy[i]:
      colors[i] = 'g'
      wordToGuessCopy[i] = '-'
      guessCopy[i] = '*'
  for i in range(len(guess)):
    if guessCopy[i] in wordToGuessCopy:
      colors[i] = 'y'
      wordToGuessCopy[wordToGuessCopy.index(guess[i])] = '-'
      guessCopy[i] = '*'
  colors = "".join(colors)
  return colors









####################################################################################################
# note: index -1 means they can show up anywhere in the word
def generatePointsV1(possibleWords):
  global WEIGHTS
  points = {-1: {},0:{}, 1:{}, 2:{}, 3:{}, 4:{}}
  for word in possibleWords:
    for i in range(len(word)):
      if word[i] in points[i]:
        points[i][word[i]] += WEIGHTS['g']
      else:
        points[i][word[i]] = WEIGHTS['g']
      if word[i] in points[-1]:
        points[-1][word[i]] += WEIGHTS['y']
      else:
        points[-1][word[i]] = WEIGHTS['y']
  return points


def getPointsForWordV1(word, points):
  wordPoints = 0
  for i in range(len(word)):
    if word[i] in points[i]:
      wordPoints += points[i][word[i]]
    if word[i] in points[-1]:
      wordPoints += points[-1][word[i]]
  return wordPoints



def get_all_poss_strings(alphabet, min_length=5, max_length=5):
    poss_strings = []

    for r in range(min_length, max_length + 1):
        poss_strings += combinations_with_replacement(alphabet, r)

    return ["".join(s) for s in poss_strings] # combinations_with_replacement returns tuples, so join them into individual strings

def generatePointsV2(possibleWords):
  possibleColors = get_all_poss_strings("gby")[1:]
  print(possibleColors)
  points = {}
  bestWord = possibleWords[0]
  bestWordScore = 0
  for i in range(len(possibleWords)):
    word = possibleWords[i]
    if i % 100 == 0:
      print("trying word %s out of %s" % (i, len(possibleWords)))
    totalWordsEliminated = 0
    for possibleColor in possibleColors:
      guess = word + " " + possibleColor
      totalWordsEliminated += len(possibleWords) - len(eliminateImpossibleWords(guess, possibleWords))
    score = totalWordsEliminated / len(possibleColors)
    points[word] = score
    if score > bestWordScore:
      bestWordScore = score
      bestWord = word
  return points



def getPointsForWordV2(word, points):
  if word in points: return points[word]
  return 0

def getLetterFrequencies(possibleWords):
  frequencies = {}
  for word in possibleWords:
    for letter in word:
      if letter in frequencies:
        frequencies[letter] += 1
      else:
        frequencies[letter] = 1
  return frequencies

def findWordWithLetters(letters):
  global words
  for word in words:
    validCount = 0
    for letter in letters:
      for l in word:
        if letter == l:
          validCount += 1
    if validCount >= 5:
      return word  
  print("COULDN'T FIND WORD")
  return ""
    
def generatePointsSmall(possibleWords, lettersGuessed):
  points = {}
  for word in possibleWords:
    score = 0
    for i in range(len(word)):
      if word[i] in lettersGuessed:
        if lettersGuessed[word[i]][i] == '-':
          score += 1
    points[word] = score
  return points

def getPointsForWordSmall(word, points):
  return points[word]

def eliminateNotPresentLetters(possibleWords, lettersGuessed):
  newLettersGuessed = {}
  for word in possibleWords:
    for letter in word:
      if letter in lettersGuessed and letter not in newLettersGuessed:
        newLettersGuessed[letter] = lettersGuessed[letter]
  return newLettersGuessed


# on a small list, the goal is just to eliminate possible letters
def generateGuessSmallList(possibleWords, lettersGuessed, guesses):
  global allWords
  wordsToGuessFrom = allWords
  lettersGuessed = eliminateNotPresentLetters(possibleWords, lettersGuessed)
  if guesses >= MAX_GUESSES - 1 or len(possibleWords) == 1:
    wordsToGuessFrom = possibleWords
  points = generatePointsSmall(wordsToGuessFrom, lettersGuessed)
  maxWordPoints = 0
  bestWord = possibleWords[0]
  for word in wordsToGuessFrom:
    if len(set(word)) != 5:
      continue
    wordPoints = getPointsForWordSmall(word, points)
    if wordPoints > maxWordPoints:
      maxWordPoints = wordPoints
      bestWord = word
  return bestWord


  


# points for a word are determined by the remaining frequency of possible words
# For example, say you have 100 words. 'r' shows up in index 3 of 30 of those words.
#   This means that having an r in index 3 is worth 150 points.
#   We also add 1 point for every r that has showed up ever
# the data structure for points is {0: {'r': 30}}
def generateGuess(possibleWords, lettersGuessed, guesses):
  if len(possibleWords) <= 1000000:
    return generateGuessSmallList(possibleWords, lettersGuessed, guesses)
  points = generatePointsV1(possibleWords)
  maxWordPoints = 0
  bestWord = possibleWords[0]
  for word in possibleWords:
    if len(set(word)) != 5:
      continue
    wordPoints = getPointsForWordV1(word, points)
    if wordPoints > maxWordPoints:
      maxWordPoints = wordPoints
      bestWord = word
  return bestWord
####################################################################################################

def getLetterCountsInGuess(lettersGuessed, word, colors):
  letterCounts = {}
  for i in range(len(word)):
    if colors[i] == 'y' or colors[i] == 'g':
      if word[i] in letterCounts:
        letterCounts[word[i]] += 1
      else:
        letterCounts[word[i]] = 1
    else:
      if word[i] not in letterCounts:
        letterCounts[word[i]] = 0
  return letterCounts


def eliminateImpossibleWords(guess, possibleWords, lettersGuessed):
  guessWord = guess.split(' ')[0]
  guessColors = guess.split(' ')[1]
  # g's - eliminate all words that don't have that letter in right position
  if 'g' in guessColors:
    newPossibleWords = []
    for word in possibleWords:
      wordMatchesCount = True
      for i in range(len(guessWord)):
        if guessColors[i] == 'g':
          if word[i] != guessWord[i]:
            wordMatchesCount = False
      if wordMatchesCount:
        newPossibleWords.append(word)
  else:
    newPossibleWords = possibleWords.copy()
  #input()
  newPossibleWords2 = []
  # for b's and y's, we just need the count of each letter.
  letterCounts = getLetterCountsInGuess(lettersGuessed, guessWord, guessColors)
  
  for word in newPossibleWords:
    wordMatchesCount = True
    for letter, count in letterCounts.items():
      # count == 0 we know for sure. Count == 1 could be lower; there could really be 2 in the real word
      if count == 0:
        if word.count(letter) != count:
          wordMatchesCount = False
      else:
        if word.count(letter) < count:
          wordMatchesCount = False
    if wordMatchesCount:
      newPossibleWords2.append(word)
  return newPossibleWords2


def getInput(humanInput, wordToGuess, guesses, displayGuesses, lettersGuessed):
  global possibleWords
  if guesses == 0 and True:
    bestGuess = "cares"
  else:
    bestGuess = generateGuess(possibleWords, lettersGuessed, guesses)
  if displayGuesses or humanInput:
    print("There are now %s possible words." % (len(possibleWords)))
    print("the next best guess is: %s" % bestGuess)
    print("So far, guessed %s times" % guesses)
  if humanInput:
    valid, errorMsg = False, ""
    while not valid:
      guess = input("Enter what you guessed ('h' to see help, 'a' to see all possible words):").lower()
      valid, errorMsg = validateGuess(guess)
      if guess == "h":
        print("\nEnter the word you guessed and the result, separated by a space. b for black, y for yellow, g for green.")
        print("Example:\nforum bbybg (in this case, the 'r' was right letter wrong place, and the 'm' was right letter right place.)")
        print()
      elif guess == 'a':
        print("possible words:")
        print(possibleWords)
      elif not valid:
        print("'%s' is not a valid guess." % guess)
        print(errorMsg)
        print("Example:\nforum bbybg (in this case, the 'r' was right letter wrong place, and the 'm' was right letter right place.)")
    return guess
  else:
    # NOT HUMAN INPUT - we must use the best guess and generate the colors
    colors = generateColors(bestGuess, wordToGuess)
    guess = "%s %s" % (bestGuess, colors)
    if displayGuesses:
      print ("guessing: '%s'" % guess)
    return guess

def getLettersGuessed(guess, lettersGuessed):
  newLettersGuessed = lettersGuessed.copy()
  guessWord = guess.split(" ")[0]
  guessColors = guess.split(" ")[1]
  for i in range(len(guessWord)):
    if guessColors[i] == 'g':
      newGuessed = ['x','x','x','x','x']
      newGuessed[i] = '*'
      newLettersGuessed[guessWord[i]] = newGuessed
    elif guessColors[i] == 'y':
      newLettersGuessed[guessWord[i]][i] = 'x'
    elif guessColors[i] == 'b':
      if guessWord[i] in newLettersGuessed:
        newLettersGuessed.pop(guessWord[i])
  return newLettersGuessed
    
    

  

def initialLettersGuessed():
  lettersGuessed = {}
  LETTERS = "abcdefghijklmnopqrstuvwxyz"
  for letter in LETTERS:
    lettersGuessed[letter] = ['-','-','-','-','-']
  return lettersGuessed


waitMessage = "Please wait while we generate the best next guess...\n\n"
######################################################################################################################################################################
def run_tests():
  TEST_WORDS_FOR_COLORS = ['rumor', 'inite', 'ample', 'seste', 'raemm', 'sleet']
  TEST_WORDS_TO_GUESS = ['aroma', 'animi', 'suite', 'teste', 'ammer', 'islet']
  TEST_WORDS_RESULTS = ['ybyyb', 'yggbb', 'bbbbg', 'bgggg', 'yyyyy', 'yybgg']
  fails = 0
  for i in range(len(TEST_WORDS_TO_GUESS)):
    actualResult = generateColors(TEST_WORDS_FOR_COLORS[i], TEST_WORDS_TO_GUESS[i])
    print("%s / %s == %s.\nActual result:   %s" % (TEST_WORDS_FOR_COLORS[i], TEST_WORDS_TO_GUESS[i], TEST_WORDS_RESULTS[i], actualResult))
    if actualResult != TEST_WORDS_RESULTS[i]:
      fails += 1
      print("FAILED")
  if fails > 0:
    print("FAILED %s TESTS, WATCH OUT" % fails)
  else:
    print("ALL TESTS PASSED :)")
  

if False:
  run_tests()
  print(eliminateImpossibleWords("rumor ybyyb", allWords, initialLettersGuessed() ))
  input()
############################################################################################################################################################

words = allWords.copy()
possibleWords = allWords.copy()
print()
WORD_TO_GUESS = ""
MAX_GUESSES = 6
guesses = 0
guess = ""
lettersGuessed = initialLettersGuessed()


HUMAN_INPUT = False
NUM_GAMES = 100
DISPLAY_GUESSES = not HUMAN_INPUT and NUM_GAMES < 5
WEIGHTS = {'y': 1, 'g': 10}

  

if not HUMAN_INPUT:
  guessesTotal = 0
  failures = 0.0000001
  failedWords = []
  print("Playing %s games" % NUM_GAMES)
  for i in range(NUM_GAMES):
    lettersGuessed = initialLettersGuessed()
    startTime = datetime.now()
    guesses = 0
    
    possibleWords = words.copy()
    WORD_TO_GUESS = possibleWords[random.randint(0, len(possibleWords) - 1)]
    #WORD_TO_GUESS = possibleWords[i]
    #WORD_TO_GUESS='taver'
    if DISPLAY_GUESSES:
      print("Playing as a robot. Trying to guess word:\n%s\n" % WORD_TO_GUESS)
    while guess.split(" ")[0] != WORD_TO_GUESS and guesses < MAX_GUESSES + 1:
      guess = getInput(HUMAN_INPUT, WORD_TO_GUESS, guesses, DISPLAY_GUESSES, lettersGuessed)
      guesses+=1
      lettersGuessed = getLettersGuessed(guess, lettersGuessed)
      possibleWords = eliminateImpossibleWords(guess, possibleWords, lettersGuessed)
      
    endTime = datetime.now()
    timeElapsed = endTime - startTime
    print("finished game %s in %s guesses; took %s seconds" % (i, guesses, timeElapsed))
    if guesses == MAX_GUESSES + 1:
      failures += 1
      failedWords.append(WORD_TO_GUESS)
      print("FAILED THIS GAME")
    else:
      guessesTotal += guesses - 1
    
    
  averageGuesses = guessesTotal / (NUM_GAMES - failures)
  print("Played %s games." % NUM_GAMES)
  print("Average guesses: %s" % averageGuesses)
  print("Failures: %s" % failures)
  print(failedWords)
else:
  print("PLAYING IN HUMAN MODE")
  while guesses < MAX_GUESSES:
    guess = getInput(HUMAN_INPUT, WORD_TO_GUESS, guesses, True, lettersGuessed)
    guesses+=1
    lettersGuessed = getLettersGuessed(guess, lettersGuessed)
    possibleWords = eliminateImpossibleWords(guess, possibleWords, lettersGuessed)
    
    print(waitMessage)
    
  
