# [Youpp](http://ambrosechua.github.io/Youpp)

A (beta) well-designed, simple YouTube client.

Code and design MIT Licensed.

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

1. Run **build.bat**
2. Enjoy your new build in the **/release** folder
6. share your build.

### [Packaging for Linux](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps#wiki-linux)

If you use Linux, you don't need help from this Linux newbie.
