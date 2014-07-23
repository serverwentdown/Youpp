# [Youpp](http://ambrosechua.github.io/Youpp)

A (beta) design-oriented, simple YouTube client.

Code and design MIT Licensed.

![youpp-splash-screenshot](https://f.cloud.github.com/assets/1705906/2428935/f84a0d7a-ac62-11e3-9ebe-b44484338afc.png)
![youpp-adv](https://f.cloud.github.com/assets/1705906/2428934/f81a83f2-ac62-11e3-9366-a7c71c58c09b.png)

## Configurations

**Please do this to prevent API overload! **

Check out the file `Youpp.app/Contents/Resources/app.nw/apikey-sample.js`, dump in your YouTube API key and rename to `apikey.js`.

## Where?

All the fun happens in `Youpp.app/Contents/Resources/app.nw/`. All powered by node-webkit!

## How to use.

Well, I just dumped the .app folder here because I left the node-webkit, so you can just `git clone` the app down and run it. 

### Developing or running on a Mac

node-webkit updates will have to be replaced on your own. [Download it](https://github.com/rogerwang/node-webkit/#downloads). Just keep the `Resources` and `Info.plist` files in the Youpp.app folder.

### Packaging for Windows

1. Run **build.bat**
2. Enjoy your new build in the **/release** folder
6. share your build.

### [Packaging for Linux](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps#wiki-linux)

If you use Linux, you don't need help from this Linux newbie.
