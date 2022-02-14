import collections
from ctypes.wintypes import WORD
import random
from datetime import datetime
from tracemalloc import start
from itertools import combinations_with_replacement
from wordleWords import allWords, realGuessWords

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
  colors = ""
  for i in range(len(guess)):
    if guess[i] == wordToGuess[i]:
      colors += 'g'
    elif guess[i] in wordToGuess:
      colors += 'y'
    else:
      colors += 'b'
  return colors





# takes in a letter, the color result of that letter, and the index of the letter
# goes through possibleWords, eliminating
def eliminateWords(letter, color, i, possibleWords):
  newPossibleWords = []
  for word in possibleWords:
    if color == 'b' and letter not in word:
      newPossibleWords.append(word)
    elif color == 'y' and letter in word and word[i] != letter:
      newPossibleWords.append(word)
    elif color == 'g' and word[i] == letter:
      newPossibleWords.append(word)
  return newPossibleWords



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
  if len(possibleWords) <= SMALL_WORDS:
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

def eliminateImpossibleWords(guess, possibleWords):

  guessWord = guess.split(' ')[0]
  guessColors = guess.split(' ')[1]
  usedLetters = []
  newPossibleWords = possibleWords.copy()
  for i in range(len(guessWord)):
    if guessWord[i] in usedLetters:
      continue
    usedLetters.append(guessWord[i])
    newPossibleWords = eliminateWords(guessWord[i], guessColors[i], i, newPossibleWords)
  return newPossibleWords


def getInput(humanInput, wordToGuess, guesses, displayGuesses, lettersGuessed, startingGuess):
  global possibleWords
  if guesses == 0 and True:
    bestGuess = startingGuess
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
####################################################
words = allWords.copy()
possibleWords = allWords.copy()
WORD_TO_GUESS = ""
MAX_GUESSES = 6
guesses = 0
guess = ""
lettersGuessed = initialLettersGuessed()


#---------------------------------------------------
HUMAN_INPUT = False
NUM_GAMES = len(realGuessWords)
DISPLAY_GUESSES = not HUMAN_INPUT and NUM_GAMES < 5
WEIGHTS = {'y': 1, 'g': 3}
SMALL_WORDS = 20
startingGuess = "pious"
#---------------------------------------------------


totalStartTime = datetime.now()
if not HUMAN_INPUT:
  guessesTotal = 0
  failures = 0.0000001
  failedWords = []
  totalTimeInGame = datetime.now() - datetime.now()
  print("Playing %s games" % NUM_GAMES)
  for i in range(NUM_GAMES):
    
    lettersGuessed = initialLettersGuessed()
    startTime = datetime.now()
    guesses = 0
    
    possibleWords = words.copy()
    #WORD_TO_GUESS = possibleWords[random.randint(0, len(possibleWords) - 1)]
    WORD_TO_GUESS = realGuessWords[i]
    #WORD_TO_GUESS='humor'
    if DISPLAY_GUESSES:
      print("Playing as a robot. Trying to guess word:\n%s\n" % WORD_TO_GUESS)
    while guess.split(" ")[0] != WORD_TO_GUESS and guesses < MAX_GUESSES + 1:
      guess = getInput(HUMAN_INPUT, WORD_TO_GUESS, guesses, DISPLAY_GUESSES, lettersGuessed, startingGuess)
      guesses+=1
      possibleWords = eliminateImpossibleWords(guess, possibleWords)
      lettersGuessed = getLettersGuessed(guess, lettersGuessed)
    endTime = datetime.now()
    timeElapsed = endTime - startTime
    totalTimeInGame += timeElapsed
    print("finished game %s in %s guesses; took %.4f seconds to guess word: %s" % (i, guesses, timeElapsed.total_seconds(), WORD_TO_GUESS))
    if guesses == MAX_GUESSES + 1:
      failures += 1
      failedWords.append(WORD_TO_GUESS)
      print("FAILED THIS GAME")
    else:
      guessesTotal += guesses
    
    
  averageGuesses = guessesTotal / (NUM_GAMES - failures)
  print("Played %s games." % NUM_GAMES)
  print("Average guesses: %s" % averageGuesses)
  print("Failures: %s" % failures)
  print(failedWords)
  print("total time in game: %s" % totalTimeInGame)
  totalEndTime = datetime.now()
  totalTime = totalEndTime - totalStartTime
  print("total time elapsed: %s" % totalTime)
else:
  print("PLAYING IN HUMAN MODE")
  while guesses < MAX_GUESSES:
    guess = getInput(HUMAN_INPUT, WORD_TO_GUESS, guesses, True, lettersGuessed, startingGuess)
    guesses+=1
    possibleWords = eliminateImpossibleWords(guess, possibleWords)
    lettersGuessed = getLettersGuessed(guess, lettersGuessed)
    print(waitMessage)
    
  



