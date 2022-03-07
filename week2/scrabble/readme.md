# scrabble.c

## what it does

enter a word and it prints its base value in scrabble.

## How it works

For every letter in the string it takes its position in the alphabet.
  There is seperate array of integers that is 26 characters long.
    It holds the scrabble score where the position in the array is the letter in the alphabet.
    
<pre>
POINTS[0] = 1

POINTS[25] = 10
</pre>

The program takes the ASCII value of each letter in the word.
  It then takes away 97 (a in ASCII is 97).

If this value is less than 26 it increases the totalValue by the letterValue.

It then returns the total value of the word.
