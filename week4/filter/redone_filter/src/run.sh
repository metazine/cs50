#!/bin/bash

echo 'What filter are you going to use?: ' &&
read filterType &&
echo 'Running filter program...' &&
node filter.js -$filterType ../test/images/input.bmp && 
ffmpeg -i output.bmp -y output.jpeg > temp.txt &&
rm temp.txt && 
xdg-open output.jpeg
