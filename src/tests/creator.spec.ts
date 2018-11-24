import * as fs from 'fs'

import Creator from '../helper'

let creator: Creator
let readmeFile: string
let readmeTemplateFile: string
let fakeReadMeFile: string
let fakeCoverageNonExistent: string
let fakeCoverageZeroLength: string
let fakeCoverageBadInfo: string
let fakeCoverageLowValue: string
const reportKeys = ['lines', 'statements', 'functions', 'branches'];

describe('Badge Maker', () => {
  beforeAll(() => {
    creator = new Creator()
    readmeFile = './README.md'
    readmeTemplateFile = './README-template.md'
    fakeReadMeFile = './FAKEREADME.md'
    fakeCoverageNonExistent = './FAKEJSON.json'
    fakeCoverageZeroLength = 'src/tests/fakeJsonZeroLength.json'
    fakeCoverageBadInfo = 'src/tests/fakeJsonBadInfo.json'
    fakeCoverageLowValue = 'src/tests/fakeJsonLowValue.json'
  })
  test('checks README.md file creation', () => {
      expect(creator.createReadme(readmeTemplateFile)).toBeTruthy()
      expect(fs.existsSync(readmeFile)).toBeTruthy()
  });
  test('checks README.md file creation failure', () => {
    expect(creator.createReadme(fakeReadMeFile)).toBeFalsy()
  })
  test('calls insertBadges', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges()).toBeTruthy()
    }
  })
  test('calls failing insertBadges non existent', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageNonExistent)).toBeFalsy()
    }
  })
  test('calls failing insertBadges zero length', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageZeroLength)).toBeFalsy()
    }
  })
  test('calls failing insertBadges bad info', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageBadInfo)).toBeFalsy()
    }
  })
  test('calls insertBadges with low values', () => {
    if (creator.createReadme()) {
      expect(creator.insertBadges(fakeCoverageLowValue)).toBeTruthy()
    }
  })
  test('checks if all lines were updated', () => {
    reportKeys.forEach((key: string) => {
      fs.readFile(readmeFile, (err, data) => {
        if (err) {
          throw err;
        }
        expect(data.indexOf(key)).toBeGreaterThan(0)
      });
    });
  })
})