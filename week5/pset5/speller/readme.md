# Speller

The goal of this program was to make a spell checking program, that runs very quickly.
To do this we were supposed to use a hash table.

The way it worked was a file containing a list of hundreds of thousands of words would be read.
These would then be loaded into a hash table.

Then a text document would be given (Such as the US constitution), but some typos would be put into it.
Then program would go through each word in the document and see if it appears in the hash table.
If it doesn't then, then it records it as a misspelt word and continues.

By the end it outputs all of the misspelt words.

## My implementation

We had to implement the hashing algorithm and hash table ourselves.

For the hashing algorithm I used Dan Bernstein's djb2 hashing algorithm, as it was fast and spread output values evenly/(pseudo)randomly.

Then for the hash table I used an array of length 2^16.
I chose the number as I found it was large enough to not have lots of collisions, while also not using too much memory.

Then I implemented a linked-list to handle collisions on each location in the array.