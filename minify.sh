#!/bin/bash

#Automatize the treatment for minifying the code. Used on Linux.
#Need to have uglify installed (if nodejs installed, do: npm -g install uglify )

minfile="gcode2dviewer.min.js"

echo "/**" > $minfile
echo " * Written by Alex Canales for ShopBotTools, Inc." >> $minfile
echo " */" >> $minfile
echo "" >> $minfile

cat gcodetogeometry.min.js >> min.js
cat gcode2dviewer.js >> min.js
uglify -s min.js -o temp.js
cat temp.js >> $minfile
rm min.js temp.js
