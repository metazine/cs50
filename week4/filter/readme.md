# helpers.c

This is the file that I actually had to program.
  The other files were written by the CS50 team and provided taking input and making output.
  At the time I didn't know how to do this.
  
In helpers.c I was given 4 functions to make:
* Grayscale filter
* Reflect filter
* Blur filter
* Edge detection filter

For each of these functions I was given a custom "image" data type.

This data type contained three arrays.
* image[y][x].rgbtRed
* image[y][x].rgbtGreen
* image[y][x].rgbtBlue

x and y represent the x and y coordinates of a pixel in the image.

.rgbt[colour] represents the value(strength) of the colours where 0 is no colour and 255 is the most possible.

I was also given height and width arguments. 
  These said how many pixels tall and wide the image is.

It only accepts the bitmap image file (BMP) type.

## grayscale filter

We can create a grey scale image by averaging the rgb values.

I did this by adding together the rgb values and dividing by three.

I then set the rgb values in each pixel to all be this averaged pixel

I could then repeat that for every pixel with a nested for loop.

## reflect/mirror filter

To do this I could take advantage of the width argument of the function.

In order to find the pixel that is on the flipped side of an image I could take its x position and take that away from the width.
  Because indexing starts at 0 in C I had to add one to the x position.
 
I could then store rgb values of the pixel I was looking at.
  Then replace this with the rgb values of the pixel on the other side.
  Then replace the rgb values of the pixels on the other sides with the values stored in the temporary variable.
 
You only have to go through half of the pixels across the x-axis otherwise they would be flipped twice.
  This would result in the same image as input being made as output.

This can be done like this:

<pre>
for (int x = 0; x < width/2; x++) {
  for (int y = 0; y < height; y++) {
  }
}
</pre>
  
## blur filter

The blur filter adds a soft blurring effect to an image. It is not a gaussian blur so that means that it doesn't keep lines and edges sharp.

It works by running 3x3 kernel over every pixel in an image.
  It total the red green and blue colour values into three different variables.
  This is then divided by the number of pixels totalled.
  
It is not just divided by 9 as where the kernel checks pixels on the edge it wouldn't average the pixels.

Like the mirror it has to create a copy of the entire screen in order for the averaged pixels to not affect other pixels.

## Sobel Edge Detection

Sobel edge detection is a type of filter that highlights edges in lighter colours and large areas of the same colour are dark/black.

It works by running two kernels over the image - one that detects edges that are vertical.
And the other that detects edges that are horizontal.

The kernels are as follows.

<pre>
-1  0  1
-2  0  2
-1  0  1
</pre>

This kernel detects vertical edges.

Each number corresponds to its position about the pixel being checked.
The 0 in the middle represents the middle pixel.

By having positive numbers on one side and negative numbers on the other the bigger the difference is the more extreme the number returned is.

The 2nd row of the column has 2s in it. 
  This is to weight the edge detection around the middle pixel.
  This makes the pixels closer to the center pixel more important/weighted.
  This creates a more sharp edge detection.







<img src="https://github.com/metazine/cs50/blob/main/week4/filter/astralEdge.png" alt="Edge detection image" style="width:400px;"/>

<img src="https://github.com/metazine/cs50/blob/main/week4/filter/colouringImage.png" alt="Edge detection image" style="width:400px; display:inline;"/>





