# readability.c

## What it does

This program determines the reading level of a text.
  It does this based on a function of three factors
  
1. the number of sentences in the text
2. The number of words in the text
3. The number of letters in the text

These three factors can then be put in the following magic formula

<pre>
let L = number of letters / number of words
let S = number of sentences / number of words

reading level is 0.0588 * L - 0.296 * S - 15.8
</pre>

## How I implemented this

First of all I take input using the get_string() function from the CS50 library.

This string is then entered into the gradeTest() function.

# gradeTest()

gradeTest has one parameter - char* text

First I define three variables to store the number of sentences, words and letters.
  The word variable starts at one because there isn't a space at the end of the last sentence

