# [Youpp](http://ambrosechua.github.io/Youpp)

A (beta) design-oriented, simple YouTube client.

Code and design MIT Licensed.

![youpp-splash-screenshot](https://f.cloud.github.com/assets/1705906/2428935/f84a0d7a-ac62-11e3-9ebe-b44484338afc.png)
![youpp-adv](https://f.cloud.github.com/assets/1705906/2428934/f81a83f2-ac62-11e3-9366-a7c71c58c09b.png)

## Configurations

**Please do this to prevent API overload! **

Check out the file `apikey-sample.js`, dump in your YouTube API key and rename to `apikey.js`.

## Packaging

```
sudo npm i -g nwjs-builder
nwb nwbuild -p win32,osx64 --win-ico ./src/icon.ico --mac-icns ./src/icon.icns ./src -o ./build
```