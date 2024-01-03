# recover.c

## What it does

It takes a raw input and finds and writes jpeg files that are found in them.

## How does this work

A .raw file is given.
This is just a bunch of 1s and 0s.

However it has multiple jpeg files on it, however they have no pointers to their start and stop positions.
  In order to read all the files I have to read the entire file.
  In the file I am looking for particular bit patterns that signify the start of jpeg.

Once I found a jpeg bit pattern, I would start writing to a new file.
  
Because of the formatting of the .raw file I know that as soon as one jpeg ends another one starts.
  If I came to a new jpeg bit pattern then I would close the previous jpeg and start writing a new one.

Also if I came to the end of a file I would close the most recent jpeg.

By this point my program has extracted all the hidden jpeg files on the .raw and then I can open them using any image viewer.

### jpeg files

jpeg files begin with the following three bytes:

<pre>
0xFF 0xD8 0xFF
</pre>

however the fourth byte is different

<pre>
0xE?
</pre>

Where ? is any number from 0-F

Or in other words the first 4 bits of the fourth byte is 1110 (0xE)

In order to find whether or not I had the correct bit pattern I used bitwise manipulation.
