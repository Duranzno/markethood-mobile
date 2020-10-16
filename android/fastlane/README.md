fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android test
```
fastlane android test
```
Runs all the tests
### android ibn
```
fastlane android ibn
```
Increment build number and push to repository - android version code
### android ivn
```
fastlane android ivn
```
Increment version number and push to repository -  android version name
### android beta
```
fastlane android beta
```
Submit a new Beta Build to Crashlytics Beta
### android build
```
fastlane android build
```
Build a version of the app
### android alpha
```
fastlane android alpha
```
Build and push a new alpha build to the Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
