# volume.c

## What it does

The user enters the name of a "wav" file as a command line argument when first running the program.
  They also enter a scale factor for the volume.
  
The program then reads the volume levels of the files and then multiplies them by the scale factor.
 
It writes these new values into a file called output.wav
 
This creates an audio file that has had its volume changed by the scale factor.

## How is a wav file formatted

A wav file starts with a header that is 44 bytes long.
  This has to be read from the original file and written into the new one.
  
The rest of the file is comprised of samples that are 2 bytes each.
  It is stored as a signed integer as soundwaves can be up or down from the base line.
 
The value of the sample maps to the height of the soundwave.
  The further from 0 the value is the louder the sound.
  
## How the code works

The given wav file uses a header that is 44 bytes long.
  So in the constant HEADER_SIZE we store the value 44 as an int.
  
There is then some basic validation performed.
1. Checking if 4 words have been given as command line args
2. Checking if the given input file exists
3. Checking if the given output file exists

If any of these aren't true it returns 1 and the program ends.

The audio scale factor is translated from a string to a float using the atof function.

Because uint8_t is 8 bits long it can be used to store the header value.
  The an array is then created with the length of HEADER_SIZE which can be used to store the header.

The first 44 bytes is read from the input file. 
  This is put into the header bucket using the fread() function.
  The fwrite function then gets the bytes from the header array and writes them to the output file.
  
I created a variable called fileSize however I don't actually use it.

I then create a int16_t type variable called sample.
  This is used to store each sample from the input file.
  
The fread() function is then used again in a while loop.
  It is in the while loop so that it doesn't stop running until it has reached the end of file.
  It then stores the sample value in the sample variable.

In order to change the loudness sample is multiplied by the factor variable.
This updated sample is then written to the output file.

This is repeated until the entire input file has been read.

Then both files are closed and the program ends.
