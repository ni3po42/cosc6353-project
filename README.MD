Timothy Stratton
Jairo Quintanilla
COSC 6353
8/2/2019

This project is split into 4 folders/projects:

### `UI`

This is the front end REACTjs code. All packages are maintained via NPM.
Notable folders:
scripts - Nodejs scripts for running things like build and test.
src - all code goes here
src/components - all REACTjs components go here
src/services - all general service objects/class are here
src/media and src/css - static images and CSS files
src/tests - all unit tests go here


### `WebServer`

This is the backend application. For assignement 2, it simply hosts the REACTjs
application. It will for assignement 3 host the RESTfull api calls.
All packages are maintained via npm.

### `DB`

This folder contains files and scripts for setting up configration for MongoDB

### `Common`
This folder contains common scripts used across the application


### `Notable folders`

public - this is the 'static' content to be hosted. This is populated from the
UI application's build script. This folder will usually only contain dev or prod
level transpiled and minified code. Do not save anything here, the build process
will delete it.

routes - this will save future REST api routes

TESTING
Any code added MUST have unit tests will near 100% code coverage. For the UI
project, run 'npm run test' to run suite. The script will be updated to include 
coverage soon.