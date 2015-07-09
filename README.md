#emoji

An emoji keyboard for Firefox OS 2.0+

## Quickstart

The keyboard is built with grunt and installed with the Firefox WebIDE.

If you don't have grunt, do ```npm install -g grunt-cli```.
See http://gruntjs.com/getting-started for more info.

If you don't have ```npm``` see https://nodejs.org/

Once those tools are installed, build the webapp:

- ```npm install``` to download dependencies
- ```grunt release``` or ```grunt dev``` to build

To install:

- Open WebIDE from the Firefox Tools developer menu.
- Connect phone or start a simulator.
- Select 'Open Packaged app...'
- Open the app subdirectory with ```manifest.webapp``` and ```settings.html```
- click the ▶︎ button

To uninstall, open the settings app on the phone, find the keyboard under
'App permissions' and click the 'Uninstal app' button on the permission
page.
