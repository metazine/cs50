# readability.c

## What it does

This program determines the reading level of a text.
  It does this based on a function of three factors
  
1. the number of sentences in the text
2. The number of words in the text
3. The number of letters in the text

These three factors can then be put in the following magic formula

<pre>
let L = number of letters / number of words * 100
let S = number of sentences / number of words * 100

reading level is 0.0588 * L - 0.296 * S - 15.8
</pre>

## How I implemented this

First of all I take input using the get_string() function from the CS50 library.

This string is then entered into the gradeTest() function.

## gradeTest()

gradeTest has one parameter - char* text

First I define three variables to store the number of sentences, words and letters.
  'letters', 'words', 'sentences'.
  The 'words' variable starts at one because there isn't a space at the end of the last sentence.
    My algorithm relies on spaces (' ') in order to count the number of words.
    
I used a for loop in order to go through every character in the text.
  I use the tolower() from the ctype standard library.
    The value is stored in the lowerChar variable.
    This standardises the text.
    I didn't know about the isalpha() function at the time.

### Working out the number of letters

I then check if the value is in the alphabet.
  This is done with the following line:
  
<pre>
if (97 <= lowerChar && lowerChar <= 122)
{
    letters ++;
}
</pre>

This takes the ASCII value of the character.
  It only returns true if the ASCII value is in the range where there are lowercase chars.
  97 is 'a'
  122 is 'z'

If it is true it increases the letter counter by one.

### Working out the number of words

If my character isn't a letter it moves to the next if statement.

<pre>
else if(lowerChar == ' ')
{
    words ++;
}
</pre>

Here if the character is a space it means that there must be the end of a word. 
  The counter for words now increases by one.

### Working out the number of sentences

I have defined an array outside the for loop called 'sentenceChars'.
  It is an array of 3 letters.
    '.', '?', '!'.

'sentenceChars' isn't a very descriptive name for this.
  However at the time of making this I didn't know the importance of descriptive names.

If my character isn't a space or a letter it moves to the next block of code.

<pre>
else
{
    for (int j = 0; j < 3; j++)
    {
        if (lowerChar == sentenceChars[j])
        {
            sentences++;
            break;
        }
    }
}
</pre>

This goes through each value in my sentenceChars array and compares them to the character being checked.
  If it is a character in there it will return true.
    The sentences counter will increase by one.
    
### Working out the grade

After we have the number of words, letters and sentences we can then calculate a grade.

This is done as follows:

<pre>
float L = letters / words * 100.0;
float S = sentences / words * 100.0;

int index = round(0.0588 * L - 0.296 * S - 15.8);

return index;
</pre>

When I wrote this code originally I had some difficulty with truncation of the integer data type and float.
  I solved this by putting a '.0' on the end of '100'.
  I also made my 'letters', 'words' and 'sentences' variable be floats for good measure.

It then prints out what grade scored.
