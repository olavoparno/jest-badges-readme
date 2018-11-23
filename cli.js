#!/usr/bin/env node

const fs = require('fs')
const replace = require('replace-in-file')

fs.copyFileSync('./README-template.md', 'README.md');
   console.log('README.md created!');

const getColour = coverage => {
  if (coverage < 80) {
    return 'red';
  }
  if (coverage < 90) {
    return 'yellow';
  }
  return 'brightgreen';
}

const reportKeys = ['lines', 'statements', 'functions', 'branches'];

const getBadge = (report, key) => {
  if (!(report && report.total && report.total[key])) {
    throw new Error('Malformed coverage report.');
  }
  const coverage = report.total[key].pct;
  const colour = getColour(coverage);
  return `https://img.shields.io/badge/Coverage-${coverage}${encodeURI('%')}-${colour}.svg`;
}

fs.readFile('./coverage/coverage-summary.json', 'utf8', (err, res) => {
  if (err) throw err
  const report = JSON.parse(res);
  let url;
  let options;
  let pattern;
  reportKeys.forEach(key => {
    url = getBadge(report, key);
    pattern = "#" + key + "#";
    console.log(url)
    options = {
      files: './README.md',
      from: pattern,
      to: url,  
    };
    try {
      const changes = replace.sync(options);
      console.log('Modified files: ', changes.join(', '));
    }
    catch (error) {
      console.error('Error occurred: ', error);
    }
  });
});