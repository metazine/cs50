#include "helpers.h"
#include <math.h>
#include <stdio.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            float total = image[y][x].rgbtRed + image[y][x].rgbtGreen +image[y][x].rgbtBlue;
            int average = round(total / 3);
            image[y][x].rgbtRed = average;
            image[y][x].rgbtGreen = average;
            image[y][x].rgbtBlue = average;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int x = 0; x < width / 2; x++)
    {
        int flippedPosition = width - (x + 1);
        for (int y = 0; y < height; y++)
        {
            int temp = image[y][x].rgbtRed;
            image[y][x].rgbtRed = image[y][flippedPosition].rgbtRed;
            image[y][flippedPosition].rgbtRed = temp;
            
            temp = image[y][x].rgbtGreen;
            image[y][x].rgbtGreen = image[y][flippedPosition].rgbtGreen;
            image[y][flippedPosition].rgbtGreen = temp;
            
            temp = image[y][x].rgbtBlue;
            image[y][x].rgbtBlue = image[y][flippedPosition].rgbtBlue;
            image[y][flippedPosition].rgbtBlue = temp;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{

    int red[height][width];
    int green[height][width];
    int blue[height][width];


    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            float totalRed = 0;
            float totalGreen = 0;
            float totalBlue = 0;
            int averagedPixels = 0;
            for(int i = 0; i < 3; i++)
            {
                for(int j = 0; j < 3; j++)
                {
                    if((i + y - 1) >= height || (i + y - 1) < 0)
                    {
                        break;
                    }
                    else if((j + x - 1) >= width|| (j + x - 1) < 0) {}
                    else
                    {
                        totalRed += image[i + y - 1][j + x - 1].rgbtRed;
                        totalGreen += image[i + y - 1][j + x - 1].rgbtGreen;
                        totalBlue += image[i + y - 1][j + x - 1].rgbtBlue;
                        averagedPixels ++;
                    }
                }
            }
            int averageRed = round(totalRed / averagedPixels);
            int averageGreen = round(totalGreen / averagedPixels);
            int averageBlue = round(totalBlue / averagedPixels);
            
            red[y][x] = averageRed;
            green[y][x] = averageGreen;
            blue[y][x] = averageBlue;
        }
    }
    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            image[y][x].rgbtRed = red[y][x];
            image[y][x].rgbtGreen = green[y][x];
            image[y][x].rgbtBlue = blue[y][x];
        }
    }
    return;
}

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{

    int red[height][width];
    int green[height][width];
    int blue[height][width];

    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            int gxRed = 0;
            int gxGreen = 0;
            int gxBlue = 0;
            
            int gyRed = 0;
            int gyGreen = 0;
            int gyBlue = 0;

            int gxyRedTotal = 0;
            int gxyGreenTotal = 0;
            int gxyBlueTotal = 0;

            int multiplyAmount;
            
            for (int i = -1; i <= 1; i++)
            {
                for(int j = -1; j <= 1; j++)
                {
                    if(i + y >= height || y + i < 0)
                    {
                    }
                    else if(x + j >= width || x + j < 0)
                    {
                    }
                    else
                    {
                        multiplyAmount = j;
                        if (i == 0)
                            multiplyAmount = j * 2;
                        
                        gxRed += image[y + i][x + j].rgbtRed * multiplyAmount;
                        gxGreen += image[y + i][x + j].rgbtGreen * multiplyAmount;
                        gxBlue += image[y + i][x + j].rgbtBlue * multiplyAmount;
                        
                        multiplyAmount = i;
                        if (j == 0)
                            multiplyAmount = i * 2;
                        
                        gyRed += image[y + i][x + j].rgbtRed * multiplyAmount;
                        gyGreen += image[y + i][x + j].rgbtGreen * multiplyAmount;
                        gyBlue += image[y + i][x + j].rgbtBlue * multiplyAmount;
                    }
                    
                    
                }
                gxyRedTotal = round(sqrt((gxRed * gxRed) + (gyRed * gyRed)));
                gxyGreenTotal = round(sqrt((gxGreen * gxGreen) + (gyGreen * gyGreen)));
                gxyBlueTotal = round(sqrt((gxBlue * gxBlue) + (gyBlue * gyBlue)));
                
                if(gxyRedTotal > 255)
                    gxyRedTotal = 255;
                
                if(gxyGreenTotal > 255)
                    gxyGreenTotal = 255;
                
                if(gxyBlueTotal > 255)
                    gxyBlueTotal = 255;
                
                red[y][x] = gxyRedTotal;
                green[y][x] = gxyGreenTotal;
                blue[y][x] = gxyBlueTotal;
              
            }
        }
    } 
    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            image[y][x].rgbtRed = red[y][x];
            image[y][x].rgbtGreen = green[y][x];
            image[y][x].rgbtBlue = blue[y][x];
        }
    }
    
    
    return;
}
