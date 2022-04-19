from sys import getsizeof

board = [
'rloct',
'inmtl',
'inrha',
'ewose',
'hvwuv'
]
counter = 0
print(board);
DEFAULT_MAX_LENGTH = 16
DEFAULT_MIN_LENGTH = 4
USER_INPUT = True

possible_words = []

def get_user_input():
    newBoard = []
    first_row = raw_input("row 1:")
    size = len(first_row)
    if size not in accepted_sizes:
        raise Exception("Only boards that are squares of size 4 and 5 are supported")
    newBoard.append(first_row)
    for i in range(1, size):
        next_row = raw_input("row %i:" % (i + 1))
        if len(next_row) != size:
            raise Exception("Only boards that are squares of size 4 and 5 are supported")
        newBoard.append(next_row)
    return newBoard
        
        
        


# args: string - the current word
# args: currentBoard - the board, with 0's in place of letters that have been used
# method: Try all 8 possible tiles around the letters, and see if it makes words
def find_word(string, row, col, currentBoard):
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
    currentLetter = currentBoard[row][col]
    if currentLetter == '0':
        return

    newBoard = currentBoard[0:]
    string += currentLetter
    if string not in words_dict:
        return
    #print(string)
    #print(row,col)
    newBoard[row] = newBoard[row][:col] + '0'
    if col <= len(board) - 2:
        newBoard[row] += currentBoard[row][col+1:]
    if string in words_dict[string] and string not in possible_words:
        #print("Added word: " + string)
        possible_words.append(string)
    if string=="iron":
        #print(newBoard)
        pass
    #Now perform the algorithm on all 8 surrounding tiles
    find_word(string, row+1, col+1, newBoard)
    find_word(string, row+1, col, newBoard)
    find_word(string, row+1, col-1, newBoard)
    find_word(string, row, col+1, newBoard)
    find_word(string, row, col-1, newBoard)
    find_word(string, row-1, col+1, newBoard)
    find_word(string, row-1, col, newBoard)
    find_word(string, row-1, col-1, newBoard)
    
    
    
    
    
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
        find_word('', row,col, board);
print("POSSIBLE WORDS:")
possible_words = sort_words_by_length(possible_words)
print(counter)
#print(possible_words)
