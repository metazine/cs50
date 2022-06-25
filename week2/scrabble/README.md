# scrabble.c

## What it does

Two players enter a word and the algorithm outputs which player entered the word with the highest base scrabble score.

## How it works

For every letter in the string it takes its position in the alphabet.
  There is seperate array of integers that is 26 characters long.
    It holds the scrabble score where the position in the array is the letter in the alphabet.
    
<pre>
POINTS[0] (a) = 1 

POINTS[25] (z) = 10 
</pre>

The program takes the ASCII value of each letter in the word.
  It then takes away 97 (a in ASCII is 97).

If this value is between 0 and 25 then it will add the letterValue to the totalValue.

This process is repeated with the second word.

The two scores are then compared and the player with the higher score is then outputted.
