import sys
import csv

def main():

    if len(sys.argv) != 3:
        print("Usage: python dna.py example.csv example.txt ")
        return 1

    csvHeaders = []
    dnaStats = []

    with open(sys.argv[1], 'r') as f:
        reader = csv.DictReader(f)
        for rows in reader:
            dnaStats.append(rows)

        for STRs in reader.fieldnames:
            csvHeaders.append(STRs)

    dnaSequenceToTest =[]
    with open(sys.argv[2], 'r') as f:
        contents = f.read()
        dnaSequenceToTest.append(contents)

    print(checkSequence(csvHeaders, dnaStats, dnaSequenceToTest))

def checkSequence (csvHeaders, dnaStats, dnaSequenceToTest):
    dnaSTRRepeats = {}

    for header in csvHeaders[1:]:
        dnaSTRRepeats[header] = findLongestDNASTR(header, dnaSequenceToTest)

    dnaMatch = False
    for people in dnaStats:
        for headers in csvHeaders[1:]:
            if int(people[headers]) != int(dnaSTRRepeats[headers]):
                dnaMatch = False
                break
            else:
                dnaMatch = True
        if dnaMatch:
            return people[csvHeaders[0]]
    return "No match"

def findLongestDNASTR(dnaSTR, dnaSequence):
    prevDnaString = ''
    currentDnaString = dnaSTR

    while str(currentDnaString) in str(dnaSequence):
        prevDnaString += dnaSTR
        currentDnaString += dnaSTR

    if len(prevDnaString) == 0:
        return 0
    return int(len(prevDnaString) / len(dnaSTR))

main()
