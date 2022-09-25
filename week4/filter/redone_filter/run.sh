#!/bin/bash

node filter.js -e input.bmp && 
ffmpeg -i output.bmp -y output.jpeg && 
xdg-open output.jpeg
