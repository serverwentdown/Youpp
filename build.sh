#!/bin/bash
echo "Packaging app..."
nwb nwbuild -p win32,osx64 --win-ico ./src/icon.ico --mac-icns ./src/icon.icns ./src -o ./build
echo "Creating archives..."
cd ./build/Youpp-osx-x64/
zip -r ../Youpp.app.zip Youpp.app
cd ../../
cd ./build/
zip -r Youpp-win.zip ./Youpp-win-ia32/
echo "Done!"
