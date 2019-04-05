import * as fs from 'fs';
import yargs from 'yargs';

import Creator from '../helper';

let creator: Creator;
let readmeFile: string;
let readmeTemplateFile: string;
let fakeReadMeFile: string;
let fakeCoverageNonExistent: string;
let fakeCoverageZeroLength: string;
let fakeCoverageBadInfo: string;
let fakeCoverageLowValue: string;
let trueBuildStatus: string;
let falseBuildStatus: string;
let fakeBuildStatus: string;
const reportKeys = ['lines', 'statements', 'functions', 'branches'];

describe('Badge Maker', () => {
  beforeAll(() => {
    creator = new Creator();
    readmeFile = './README.md';
    readmeTemplateFile = './README-template.md';
    fakeReadMeFile = './FAKEREADME.md';
    fakeCoverageNonExistent = './FAKEJSON.json';
    fakeCoverageZeroLength = 'src/tests/mock/fakeJsonZeroLength.json';
    fakeCoverageBadInfo = 'src/tests/mock/fakeJsonBadInfo.json';
    fakeCoverageLowValue = 'src/tests/mock/fakeJsonLowValue.json';
    trueBuildStatus = 'src/tests/mock/.trueBuildStatus';
    falseBuildStatus = 'src/tests/mock/.falseBuildStatus';
    fakeBuildStatus = './.FAKEBUILD';
  });
  test('checks README.md file creation', () => {
    expect(creator.createReadme(readmeTemplateFile)).toBeTruthy();
    expect(fs.existsSync(readmeFile)).toBeTruthy();
  });
  test('checks README.md file creation failure', () => {
    expect(creator.createReadme(fakeReadMeFile)).toBeFalsy();
  });
  test('calls insertBadges', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges()).toBeTruthy();
    }
  });
  test('calls failing insertBadges non existent', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageNonExistent)).toBeFalsy();
    }
  });
  test('calls failing insertBadges zero length', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageZeroLength)).toBeFalsy();
    }
  });
  test('calls failing insertBadges bad info', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageBadInfo)).toBeFalsy();
    }
  });
  test('calls insertBadges with low values', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageLowValue)).toBeTruthy();
    }
  });
  test('checks if all lines were updated', () => {
    reportKeys.forEach((key: string) => {
      fs.readFile(readmeFile, (err, data) => {
        if (err) {
          throw err;
        }
        expect(data.indexOf(key)).toBeGreaterThan(0);
      });
    });
  });
  describe('Testing building', () => {
    test('check build status failing', () => {
      expect(creator.getBuildStatus(falseBuildStatus)).toBeFalsy();
    });
    test('check build status nonExistent', () => {
      expect(creator.getBuildStatus(fakeBuildStatus)).toBeFalsy();
    });
    test('check build status passing', () => {
      expect(creator.getBuildStatus(trueBuildStatus)).toBeTruthy();
    });
    afterAll(() => {
      creator.createReadme(readmeTemplateFile);
    });
  });
  describe('Testing with arguments', () => {
    beforeAll(() => {
      process.argv.push('--coverageDir="./coverage"');
    });
    test('checks for different coverageDirectory as args', () => {
      if (creator.createReadme()) {
        expect(creator.insertBadges()).toBeFalsy();
      }
    });
  });
});
