import * as fs from 'fs';

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
const reportKeys = [
  { key: 'branches', value: '![Branches]' },
  { key: 'functions', value: '![Functions]' },
  { key: 'lines', value: '![Lines]' },
  { key: 'statements', value: '![Statements]' },
];

describe('Badge Maker', () => {
  beforeEach(() => {
    creator = new Creator();
  })
  beforeAll(() => {
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
  test('checks README.md from template file creation', () => {
    expect(creator.createReadme(readmeTemplateFile)).toBeTruthy();
    expect(fs.existsSync(readmeFile)).toBeTruthy();
  });
  test('checks README.md from readme file creation', () => {
    expect(creator.createReadme()).toBeTruthy();
    expect(fs.existsSync(readmeFile)).toBeTruthy();
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
    fs.readFile(readmeFile, (err, data) => {
      if (err) {
        throw err;
      }
      reportKeys.forEach((reportKey: Record<string, string>) => {
        expect(data.indexOf(reportKey.key)).toBeGreaterThan(0);
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
      creator.createReadme();
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
