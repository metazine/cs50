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
  
## What the code does


