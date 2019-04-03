# [Jest Badges Readme](https://www.npmjs.com/package/@olavoparno/jest-badges-readme)

[![CodeClimate](https://img.shields.io/codeclimate/maintainability/olavoparno/jest-badges-readme.svg)](https://codeclimate.com/github/olavoparno/jest-badges-readme) [![CodeClimate](https://img.shields.io/codeclimate/maintainability-percentage/olavoparno/jest-badges-readme.svg)](https://codeclimate.com/github/olavoparno/jest-badges-readme)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/olavoparno/jest-badges-readme/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@olavoparno/jest-badges-readme.svg?style=flat)](https://www.npmjs.com/package/@olavoparno/jest-badges-readme) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]() ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")

### Creates Jest Coverage badges for your README.md file

| Statements | Branches | Functions | Lines | Build Status |
| -----------|----------|-----------|-------| ------------ |
| ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") | ![BuildStatus](#buildstatus# "Building Status") |

### TL;DR

- To be short, all it does is: **Creates your README.md dynamically with your Jest Coverage Badges based on your README-template.md file**

### Installation

- Global Installation
  ```bash
    npm i -g @olavoparno/jest-badges-readme
  ```

- Local Installation
  ```bash
    npm i @olavoparno/jest-badges-readme --save-dev
  ```

### Configuration and requirements

  1. Have Jest installed and with its Coverage Reporting configuration as below
  
  - It may be set inside your Jest config within `package.json` or inside your jest config file i.e. `jest.config.js` or `jestconfig.json`

    ```js
      "coverageReporters": [
        "json-summary",
        "text",
        "lcov"
      ]
    ```
  
  2. Have a _*README-template.md*_ file created with the following template (please do feel free to change its presentation structure, e.g. in a table or not)

  ```md
  | Statements | Branches | Functions | Lines |
  | -----------|----------|-----------|-------|
  | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |
  ```

  3. Call if from your terminal or from your NPM/YARN Scripts
 
  - For locally installed library

    ```json
      "make-badges": "node_modules/.bin/jest-badges-readme"
    ```

  - For globally installed library

    ```json
      "make-badges": "npm run jest-badges-readme"
    ```

  - You may also provide a different coverage folder path passed as arguments

    ```json
      "make-badges": "npm run jest-badges-readme --coverageDir='./my-custom-coverage-folder'"
    ```

  - And finally via the very terminal

    ```bash
      jest-badges-readme --coverageDir='./my-custom-coverage-folder'
    ```

### Short summary onto what Jest and Jest Badges Readme covers for us

  - % Stmts (which states for Statements)
  - % Branch (pretty self explanatory)
  - % Functions (won't repeat myself)
  - % Lines (last but not least)

#### This library will create badges URLs for these former 4 items into your _*README-template.md*_ if you followed the previous steps

  - Open up your _*README-template.md*_ and add 4 _*markers*_ inside it for each Jest coverage item respectively. These _*markers*_ must be as follows:

    1. '#statements#'
    2. '#branches#'
    3. '#functions#'
    4. '#lines#'

#### If you feel you might need a local building badge indicator, add these NPM scripts in order to manage your local building badge as well

  ```json
    "prebuild": "echo nok > .buildstatus",
    "postbuild": "echo ok > .buildstatus"
  ```

  - Add one more marker like the example below. This is going to create a file called _*.buildstatus*_ in your project's root telling this library if your build is either successful or a failure
    1. '#buildstatus#'
  
#### Example of _*README-template.md*_ with building status too

  ```md
  | Statements | Branches | Functions | Lines | Build Status |
  | -----------|----------|-----------|-------| ------------ |
  | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") | ![BuildStatus](#buildstatus# "Building Status") |
  ```

### Using as a part of your githooks
  
  - If you want to have this run on the precommit hook and update the commit in place, just install husky and add the `precommit` script to your package.json

  1. Install Husky
   
  ```bash
    npm install --save-dev husky 
  ```

  2. Add your precommit script
    
  ```json
    "husky": {
      "hooks": {
        "pre-commit": "jest && node_modules/.bin/jest-badges-readme && git add 'README.md'"
      }
    }
  ```

  3. Git Commit and Push. Just use your workflow as usual. If your tests fail, no commit. If they pass, update the README.md and add the file to the commit. Nice!

### Contributing

The purpose of this library is to motivate developers to constantly write a solid documentation and testing. A complete and nice looking documentation is key to a successful development and code maintainability.
Please feel free to open any issues you might come up with and to submit your own PRs. There is not a contributing guide yet

### License

Jest Badges Readme is [MIT licensed](./LICENSE).


  