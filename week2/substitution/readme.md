### substitution.c

## What it does

User enters a string of 26 non repeating characters as a command line argument.
  This works as an encryption key.

The user is the prompted to enter any string.

Upon entering a string it returns a ciphered string.

## How the cipher works

For every letter in the string it is replaced by the character in the key in the same position in the alphabet.

<pre>
In this example my key is 'qcvamouygpxhrisewbkdjlzntf'

I am going to encrypt the word 'luke'

</pre>
<pre>

luke
^
'l' is the 12th letter of the alphabet

q c v a m o u y g p x h r i s e w b k d j l z n t f
                      ^
It is encrypted as 'h'

</pre>
<pre>

luke
 ^

'u' is the 2nd letter of the alphabet

q c v a m o u y g p x h r i s e w b k d j l z n t f
                                        ^
It is encrypted as 'j'

</pre>
<pre>

luke
  ^

'k' is the 12th letter of the alphabet

q c v a m o u y g p x h r i s e w b k d j l z n t f
                    ^
                    
It is encrypted as 'x'                   

</pre>
<pre>

luke
   ^
   
'e' is the 5th letter of the alphabet

q c v a m o u y g p x h r i s e w b k d j l z n t f
          ^

It is encrypted as '0'
</pre>
<pre>

It is encrypted overall as 'hjxo'
</pre>
