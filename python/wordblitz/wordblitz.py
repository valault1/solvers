from sys import getsizeof



board = [
['k3l' ,'z', 'g2w', 'o3l'],
['a' ,'r', 'i3w', 'o2l'],
['m' ,'i', 't', 't'],
['s2l' ,'d', 'o', 's2w'],
]
counter = 0
print(board);
DEFAULT_MAX_LENGTH = 16
DEFAULT_MIN_LENGTH = 4
USER_INPUT = True

letter_scores = {
    "a": 1,
    "b": 3,
    "c": 3,
    "d": 2,
    "e": 1,
    "f": 4,
    "g": 2,
    "h": 4,
    "i": 1,
    "j": 8,
    "k": 5,
    "l": 1,
    "m": 3,
    "n": 1,
    "o": 1,
    "p": 3,
    "q": 10,
    "r": 1,
    "s": 1,
    "t": 1,
    "u": 1,
    "v": 4,
    "w": 4,
    "x": 8,
    "y": 4,
    "z": 10,
    "0": 0 # a symbol to indicate a space already used
}

possible_words = {}

def get_user_input():
    newBoard = []
    first_row = input("row 1:").split(" ")
    size = len(first_row)
    if size not in accepted_sizes:
        raise Exception("Only boards that are squares of size 4 and 5 are supported")
    newBoard.append(first_row)
    for i in range(1, size):
        next_row = input("row %i:" % (i + 1)).split(" ")
        if len(next_row) != size:
            raise Exception("Only boards that are squares of size 4 and 5 are supported")
        newBoard.append(next_row)
    print(newBoard)
    return newBoard
        
        
# returns the score of the input letter
# input must either be of format "a2l", "a3l", "a2w", "a32" (a can be any letter)
def get_letter_score(input_string):
    global letter_scores
    letter = input_string[0]
    if len(input_string) == 1 or input_string[2] == "w" :
        return letter_scores[letter]
    if input_string[2] == "l":
        return letter_scores[letter] * int(input_string[1])
    print("WARNING: GOT HERE ON STRING %s" % input_string)


    

# args: string - the current word
# args: currentBoard - the board, with 0's in place of letters that have been used
# method: Try all 8 possible tiles around the letters, and see if it makes words
def find_word(string, row, col, currentBoard, currentWordScore, currentWordBonus):
    #print(row, col)
    global counter
    counter += 1
    if row >= len(board) or row < 0:
        return
    if col >= len(board[row]) or col < 0:
        return 
    if len(string) >= DEFAULT_MAX_LENGTH:
        return
    global possible_words, words_dict

    currentString = currentBoard[row][col]
    currentLetter = currentString[0]

    if currentLetter == '0':
        return

    # calculate word bonus
    newWordBonus = currentWordBonus
    if (len(currentString) > 2 and currentString[2] == 'w'):
        newWordBonus *= int(currentString[1])

    # calculate score
    print("currentWordScore: %s" % currentWordScore)
    print(currentBoard)
    newWordScore = currentWordScore + get_letter_score(currentString)

    newBoard = currentBoard[0:]
    string += currentLetter
    if string not in words_dict:
        return
    #print(string)
    #print(row,col)
    newBoard[row] = newBoard[row][:col] + ['0']
    if col <= len(board) - 2:
        newBoard[row].extend(currentBoard[row][col+1:])
    if string in words_dict[string]:
        if string in possible_words:
            if possible_words[string] < newWordScore * newWordBonus:
                possible_words[string] = newWordScore * newWordBonus
        else:
            possible_words[string] = newWordScore * newWordBonus
        #print("Added word: " + string)

    #Now perform the algorithm on all 8 surrounding tiles
    find_word(string, row+1, col+1, newBoard, newWordScore, newWordBonus)
    find_word(string, row+1, col, newBoard, newWordScore, newWordBonus)
    find_word(string, row+1, col-1, newBoard, newWordScore, newWordBonus)
    find_word(string, row, col+1, newBoard, newWordScore, newWordBonus)
    find_word(string, row, col-1, newBoard, newWordScore, newWordBonus)
    find_word(string, row-1, col+1, newBoard, newWordScore, newWordBonus)
    find_word(string, row-1, col, newBoard, newWordScore, newWordBonus)
    find_word(string, row-1, col-1, newBoard, newWordScore, newWordBonus)
    
    
    
    
    
    return


# returns a dictionary where the keys are possible starts for words and the values are words it could be
def read_words_file(file_location):
    result = {}
    for line in open(file_location, 'r'):
        word = line[:-1]
        for i in range(len(word) + 1):
            substring = word[0:i]
            if substring in result:
                result[substring].append(word)
            else:
                result[substring] = [word]
    return result
            
    
def sort_words_by_length(words):
    words = words[0:]
    result = []
    for i in range(DEFAULT_MAX_LENGTH,DEFAULT_MIN_LENGTH-1,-1):
        first = True
        for word in words:
            if len(word) == i:
                if first:
                    print("" + str(i) + "-------------------------")
                    first = False
                print(word)
                result.append(word)
    return result

    

#######################################################################
# main
accepted_sizes = [4,5]
if USER_INPUT:
    board = get_user_input()

is_error = False
if len(board) not in accepted_sizes:
    is_error = True
for row in board:
    if len(row) != len(board):
        is_error = True
if is_error:
    raise Exception("The board is not a square of size 4 or 5") 
        

#words_dict stores each section of the words.txt file
# ex. words_dict['a'] is a list of all words that begin with a
words_dict = read_words_file('scrabble_words_cleaned.txt')
for row in range(len(board)):
    for col in range(len(board[row])):
        find_word('', row,col, board, 0, 1);
print("POSSIBLE WORDS:")
possible_words =  dict(sorted(possible_words.items(), key=lambda item: item[1], reverse=False))
print(possible_words)
for k,v in possible_words.items():
    print("%s\t%s" % (k,v))
#print(words_dict)
