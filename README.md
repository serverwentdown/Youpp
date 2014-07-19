# [Youpp](http://ambrosechua.github.io/Youpp)

A (beta) design-oriented, simple YouTube client.

Code and design MIT Licensed.

![youpp-splash-screenshot](https://f.cloud.github.com/assets/1705906/2428935/f84a0d7a-ac62-11e3-9ebe-b44484338afc.png)
![youpp-adv](https://f.cloud.github.com/assets/1705906/2428934/f81a83f2-ac62-11e3-9366-a7c71c58c09b.png)

## Configurations

**Do this in order to run**

Check out the file `Youpp.app/Contents/Resources/app.nw/apikey-sample.js`, dump in your YouTube API key and rename to `apikey.js`.

## Where?

All the fun happens in `Youpp.app/Contents/Resources/app.nw/`. All powered by node-webkit!

## How to use.

Well, I just dumped the .app folder here because I left the node-webkit.

### Developing or running on a Mac

Just clone this and you will find the app sitting in the folder without the need to compile anything.

Problem is, node-webkit updates will have to be replaced on your own. [Download it](https://github.com/rogerwang/node-webkit/#downloads). Just keep the `Resources` and `Info.plist` files in the Youpp.app folder.

### Packaging for Windows

Follow the [guide](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps#wiki-windows-1) on node-webkit wiki, or just read this:

1. zip up the **contents** of the app.nw folder (don't be lazy and zip up the app.nw folder). Rename the zip to app.nw
2. [Download](https://github.com/rogerwang/node-webkit/#downloads) node-webkit windows and rename folder to "node-webkit".
3. Put the app.nw file into that folder.
4. Run pack-Youpp.bat in the parent folder of node-webkit.
5. zip up the new Youpp folder.
6. share your build.

### [Packaging for Linux](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps#wiki-linux)

If you use Linux, you don't need help from this Linux newbie.
