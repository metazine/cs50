# About this project
* week 1
* second project made 
* took 3 hours to complete
  
## Going into the project

I went into this project thinking that it would be easy.
    I had completed Khan Academy's intro to JS and a few other things from it.
    At this point I didn't realise how much more there is too learn. 
        I thought I could breeze through the entire course.
    For the most part I didn't find this project very hard.
        I had some difficulties but nothing too major.

## Working through the problems

### validating input
First I had to try and get a basic understanding of how data types worked in C.
    As this program only used two data types where I had to explicitly name them this wasn't an issue.

The first part of the problem was to get the do while loop working.
    I used the built in CS50 library to take input.
    I had to reject any pyramid sizes greater than 7 and less than 0.

The next problem I had to solve was to draw the pyramid itself

### Making the pyramid

I started by making one side of the pyramid.
    I used a nested for loop.
        The outer loop looped for every row in the pyramid.
            It used 'i' as its counter
        The inner loop then ran for every # in each row.
            It did this by looping 'i' from the outer loop times.
            It then printed one #

This outputted something similar to this:

<pre>
#
##
###
####
</pre>

I now wanted it to look like this:

<pre>
   #
  ##
 ###
####
</pre>

I worked out that there is a sort of upside down triangle on the left of the pyramid.
    The number of gaps on any given row was the total number of rows minus the number of bricks (\#) that were on that row.

<pre>
123#
12##
1###
####
</pre>

At this point I had only worked on this for about 15 minutes.
    I thought that it couldn't be that difficult to complete the other side.

At this point I started to not think about how I can solve the solution well.
    Instead I began just trying to flimsily put things together to get the job done.
    This led me to making a "drawnGapOnce" variable that I created outside the for loops.
    
I used a bunch of magic numbers and spaghetti code to try and finish the pyramid.

This code is full of unnecessary things that make it much harder to read.
    There are a fair amount of things I could have solved by simply moving things out of a loop.
    
## Conclusion

This was my second step into programming, and was a good introduction to strongly typed languages. 
However it wasn't until later projects that I learnt better ways to do things. 
    Including better names and more elegant code.








