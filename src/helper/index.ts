import * as fs from 'fs';

import { badgeHashs } from './constants'
import { IReport } from './interface'

const readmeFile: string = badgeHashs.readmeFile;
const readmeTemplateFile: string = badgeHashs.readmeTemplateFile;

export default class Helper {
  private reportKeys: string[] = badgeHashs.hashes.jest;
  
  public createReadme = (path: string = readmeTemplateFile): boolean => {
    if (fs.existsSync(path)) {
      fs.copyFileSync(path, readmeFile);
      console.log('\x1b[1m\x1b[32m', `Template read succesfully. ${readmeFile} created!`);
      return true;
    } else {
      console.log('\x1b[1m\x1b[31m', `Error: ${readmeTemplateFile} file not not found.`);
      console.log('\x1b[1m\x1b[32m', `You must have a ${readmeTemplateFile} created. Please read the documentation.`);
      return false;
    }
  };
  
  public insertBadges = (path: string = badgeHashs.jsonCoverageFile): boolean => {
    let returnValue: boolean = false;
    const coveragePath = this.getCoveragePath(path)
    if (fs.existsSync(coveragePath)) {
      const coverageFile = fs.readFileSync(coveragePath, 'utf8');
      if (!coverageFile.length) {
        console.log('\x1b[1m\x1b[31m', 'Malformed coverage report. Please run Jest again');
        return false;
      }
      const report: IReport = JSON.parse(coverageFile);
      let readmeFileData: string = fs.readFileSync(readmeFile, 'utf8');
      this.reportKeys.forEach(key => {
        const url: string = this.getBadge(report, key);
        if (url.length) {
          const pattern: string = '#' + key + '#';
          readmeFileData = readmeFileData.replace(pattern, url);
          console.log('\x1b[1m\x1b[32m', 'Badge for', key, 'updated with:', url);
          returnValue = true;
          fs.writeFileSync(readmeFile, readmeFileData, 'utf8');
        } else {
          returnValue = false;
        }
      })
      this.getBuildStatus()
    } else {
      console.log('\x1b[1m\x1b[31m', 'Error: ' + path + ' file not found.');
      console.log('\x1b[1m\x1b[32m', 'Do you have Jest installed? If so, is it properly configured?');
      returnValue = false;
    }
    return returnValue;
  };
  
  public getBuildStatus = (path: string = badgeHashs.buildFile): boolean => {
    let url: string = badgeHashs.getBuildUrl('Build', 'Passing', 'brightgreen');
    let returnValue: boolean = false
    const pattern: string = `#${badgeHashs.hashes.build}#`;
    if (fs.existsSync(path)) {
      let readmeFileData = fs.readFileSync(readmeFile, 'utf8');
      const buildStatus = fs.readFileSync(path, 'utf8')
      if (buildStatus === 'ok') {
        url = badgeHashs.getBuildUrl('Build', 'Passing', 'brightgreen');
        returnValue = true
      } else if (buildStatus === 'nok') {
        url = badgeHashs.getBuildUrl('Build', 'Failing', 'brightred');
        returnValue = false
      }
      readmeFileData = readmeFileData.replace(pattern, url)
      fs.writeFileSync(readmeFile, readmeFileData, 'utf8');
      console.log('\x1b[1m\x1b[32m', 'Writing building status', buildStatus, 'with URL:', url);
    } else {
      returnValue = false
    }
    return returnValue
  }

  private getCoveragePath = (path: string): string => {
    let coveragePath = path;
    const packageJson = require('../../package.json');
    const jestConfig = require('../../jestconfig.json');

    if (packageJson.jest && packageJson.jest.coverageDirectory) {
      coveragePath = `${packageJson.jest.coverageDirectory.replace('<rootDir>', '.')}/coverage-summary.json`;
    }
    if (jestConfig && jestConfig.coverageDirectory) {
      coveragePath = `${jestConfig.coverageDirectory.replace('<rootDir>', '.')}/coverage-summary.json`;
    }
    return coveragePath
  }

  private getBadge = (report: IReport, key: string): string => {
    if (!(report && report.total && report.total[key])) {
      console.log('\x1b[1m\x1b[31m', 'Malformed coverage report for the key ' + key + '. Please run Jest again.');
      return '';
    }
    const coverage: number = report.total[key].pct;
    const color = this.getColor(coverage);
    return badgeHashs.getCoverageUrl(coverage, color)
  };

  private getColor = (coverage: number): string => {
    if (coverage < 80) {
      return 'red';
    }
    if (coverage < 90) {
      return 'yellow';
    }
    return 'brightgreen';
  };
}
