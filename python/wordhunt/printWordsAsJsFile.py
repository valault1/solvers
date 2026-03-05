input_file = "engmix.txt"
output_file = "output.txt"

with open(input_file, "r") as file:
    words = [line.strip() for line in file if line.strip() and len(line.strip()) >= 4]
    formatted = ', '.join(f'"{word}"' for word in words)

with open(output_file, "w") as out:
    out.write("export const allWords = [" + formatted + "];")