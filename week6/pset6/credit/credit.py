def main():
    cardNum = input("Enter your credit card number: ")

    cardType = findCardType(cardNum)
    if cardType == "INVALID":
        print (cardType)
        return 1

    if luhnsAlgorithm(cardNum):
        print (cardType)
        return 0
    else:
        print("INVALID")
        return 1



def findCardType(cardNum):
    cardNumLength = len(cardNum)

    if cardNumLength == 15 and cardNum[0] == '3' and (cardNum[1] == '4' or cardNum[1] == '7'):
        return "AMEX"

    elif cardNumLength == 16 and cardNum[0] == '5':
        secondCardNumberIsValid = (int(cardNum[1]) > 0 and int(cardNum[1]) <= 6)
        if secondCardNumberIsValid:
            return "MASTERCARD"
        return "INVALID"

    elif cardNumLength == 16 or cardNumLength == 13:
        if cardNum[0] == '4':
            return "VISA"
        return "INVAlID"

    else:
        return "INVALID"

def luhnsAlgorithm(creditNum):
    creditNumLength = len(creditNum)

    totalOne = 0;


    for i in range(0, creditNumLength - 1, 2):
        sumOne = int(creditNum[creditNumLength - (i + 2)]) * 2
        print
        if sumOne >= 10:
            sumOne = 1 + (sumOne - 10)
        totalOne += sumOne

    totalTwo = 0
    for i in range(0, creditNumLength, 2):
        sumTwo = int(creditNum[creditNumLength - (i + 1)])
        totalTwo += sumTwo

    valid = ((totalOne + totalTwo) % 10) == 0

    if valid:
        return True
    return False



main()