#!/bin/bash

node filter.js -e test_images/input.bmp && 
ffmpeg -i output.bmp -y output.jpeg > temp.txt &&
rm temp.txt && 
xdg-open output.jpeg
