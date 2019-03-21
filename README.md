# Jest Badges Readme

### Creates Jest Coverage badges for your README.md file.

| Statements | Branches | Functions | Lines | Build Status | Built By | We Love |
| -----------|----------|-----------|-------| ------------ | -------- | ------- |
| ![Statements](https://img.shields.io/badge/Coverage-75.95%25-red.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-71.74%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-80%25-yellow.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-75.95%25-red.svg "Make me better!") | ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") | ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") | ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")

### TL;DR

- To be short, all it does is: **Creates your README.md dinamically with your Jest Coverage Badges on top of your README-template.md file.**

### Installation

- Global Installation
  ```bash
    npm i -g @olavoparno/jest-badges-readme
  ```

- Local Installation
  ```bash
    npm i @olavoparno/jest-badges-readme --save-dev
  ```

### Requirements (it's taken for granted that you'll meet those). Also please be working with any project running Jest.

- Minor adendum: you must have your Jest configured  with the property _*coverageReporters*_ properly setup. e.g.:
  ```js
    "coverageReporters": [
      "json-summary",
      "text",
      "lcov"
    ]
  ```
- Have a _*README-template.md*_ file created.
- You are able to change your coverageDir if you wish. You can either use your `jest.config.js` or `jestconfig.json`, via the jest config node in your `package.json` or even passing in as an argument, see below:

  - `jestconfig.json` or `package.json` (this inside jest config node) example:
  ```json
    "coverageDirectory": "./my-custom-coverage-folder"
  ```

  - When calling it from one of your project scripts inside your `package.json`:
  ```bash
    jest-badges-readme --coverageDir='./my-custom-coverage-folder'"
  ```

### Let's all get back to what Jest covers for us.

- % Stmts (which states for Statements).
- % Branch (pretty self explanatory).
- % Functions (won't repeat myself).
- % Lines (last but not least).

#### This tool will create badge URLs for these former 4 items into your _*README-template.md*_ if you follow the next steps:

- Open up your _*README-template.md*_ and add 4 _*markers*_ inside it respectively for each Jest coverage items. These _*markers*_ would be as follows:
  1. '#statements#'
  2. '#branches#'
  3. '#functions#'
  4. '#lines#'

### Are you in need of a local building badge? Add these NPM scripts in order to manage your local building badges as well:

```json
  "prebuild": "echo nok > .buildstatus",
  "postbuild": "echo ok > .buildstatus"
```

- Add one more marker like this:
  1. '#buildstatus#'
- This is going to create a file called _*.buildstatus*_ in your root project telling this tool if your build is successful or not with either *ok* or *nok*. Simply put.

Example of _*README-template.md*_:

```md
| Statements | Branches | Functions | Lines | Build Status | Built By | We Love |
| -----------|----------|-----------|-------| ------------ | -------- | ------- |
| ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") | ![BuildStatus](#buildstatus# "Building Status") | ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") | ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")
```

Which results in in the report above!

### Summarizing it all

  #### Create a NPM Script as the example:
  - For locally installed library:

    ```json
      "make-badges": "node_modules/.bin/jest-badges-readme || true",
      "make-readme": "npm run test:coverage && npm run make-badges"
    ```

  - For globally installed library:

    ```json
      "make-readme": "npm run test:coverage && jest-badges-readme"
    ```

  - Using a different coverage folder passed as arguments

    ```json
      "make-readme": "npm run test:coverage && jest-badges-readme --coverageDir='./my-custom-coverage-folder'"
    ```


  