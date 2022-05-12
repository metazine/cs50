def main():
    text = input("Text: ")

    index = gradeTest(text)

    if index < 1:
        print("Before Grade 1")
    elif index >= 16:
        print("Grade 16+")
    else:
        print(f"Grade {round(index)}")


    
def gradeTest(text):
    sentenceCount = 0
    wordCount = 1
    letterCount = 0
    
    for i in range(len(text)):
    if text[i] in ['!', '.', '?']:
        sentenceCount += 1
    elif text[i] == ' ':
        wordCount += 1
    elif text[i].isalpha():
        letterCount += 1
        
    print(f"{letterCount} letter(s)")
    print(f"{wordCount} word(s)")
    print(f"{sentenceCount} sentence(s)")

    L = letterCount / wordCount * 100
    S = sentenceCount / wordCount * 100

    index = (0.0588  * L) - (0.296 * S) - 15.8
    return index

main()