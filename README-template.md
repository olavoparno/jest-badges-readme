# Jest Badges Readme

### Creates Jest Coverage badges for your README.md file.

| Statements | Branches | Functions | Lines | Built By | We Love |
| -----------|----------|-----------|-------| -------- | ------- |
| ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") | ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") | ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")

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

Example of _*README-template.md*_:

```md
  | Statements | Branches | Functions | Lines | Built By | We Love |
  | -----------|----------|-----------|-------| -------- | ------- |
  | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") | ![BuiltBy](https://img.shields.io/badge/TypeScript-Lovers-black.svg "img.shields.io") | ![ForTheBadge](https://img.shields.io/badge/Using-Badges-red.svg "ForTheBadge")
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