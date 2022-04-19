accepted_letters = ['a','b','c','d','e','f','g','h','i','j','k','l',
                    'm','n','o','p','q','r','s','t','u','v','w','x','y','z']
valid_words = []
print("getting valid words...")
for line in open('scrabble_words.txt', 'r'):
    word = line[:-1].lower()
    is_valid_word = len(word) >= 3
    for letter in word:
        if letter not in accepted_letters:
            is_valid_word = False
    if is_valid_word:
        valid_words.append(word)
cleaned_file = open('scrabble_words_cleaned.txt','w')
print("Now writing words to file...")
for word in valid_words:
    cleaned_file.write(word + "\n")
cleaned_file.close()
