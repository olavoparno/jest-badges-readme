# Jest Badges Readme

### Creates Jest Coverage badges for your README.md file.

### TL;DR

 - To be short, all it does is: **Creates your README.md dinamically with your Jest Coverage Badges on top of your README-template.md file.**

### Installation

  1. Global Installation
  ```bash
    npm i -g @olavoparno/jest-badges-readme
  ```

  2. Local Installation
  ```bash
    npm i @olavoparno/jest-badges-readme --save-dev
  ```

### Requirements (it's taken for granted that you'll meet those):

1. Be working with any project running Jest.
  - Minor adendum: you must have your Jest configured  with the property _*coverageReporters*_ properly setup. Ex.:
  ```js
    "coverageReporters": [
      "json-summary",
      "text",
      "lcov"
    ]
  ```
2. Have a _*README-template.md*_ file created.

### Open your _*README-TEMPLATE.MD*_

- Let's all get back to what Jest covers for us.
  1. %Stmts (which states for Statements).
  2. %Branch (pretty self explanatory).
  3. %Functions (won't repeat myself).
  4. %Lines (last but not least).

- This tool will create badge URLs for these former 4 items into your _*README-template.md*_ if you follow the next steps:

  1. Open up your _*README-template.md*_ and add 4 _*markers*_ inside it respectively for each Jest coverage items. These _*markers*_ would be as follows:
    - '#statements#'
    - '#branches#'
    - '#functions#'
    - '#lines#'
  
  Example of _*README-template.md*_:

  ```markdown
    | Statements | Branches | Functions | Lines | Built By | We Love |
    | -----------|----------|-----------|-------| -------- | ------- |
    | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") | ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") | ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")
  ```

  Which would result in:

| Statements | Branches | Functions | Lines | Built By | We Love |
| -----------|----------|-----------|-------| -------- | ------- |
| ![Statements](https://img.shields.io/badge/Coverage-90.27%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-63.46%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-72.55%25-red.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-90.85%25-brightgreen.svg "Make me better!") | ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") | ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")

### Summarizing it all

  - Create a NPM Script as the example:
    1. For locally installed library:
    ```json
      "make-badges": "node_modules/.bin/jest-badges-readme || true",
      "make-readme": "npm run test:coverage && npm run make-badges"
    ```

    2. For globally installed library:
    ```json
      "make-readme": "npm run test:coverage && jest-badges-readme"
    ```