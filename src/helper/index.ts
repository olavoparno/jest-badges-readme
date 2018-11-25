import * as fs from 'fs';

import { badgeHashs } from './constants'
import { IReport } from './interface'

export default class Helper {
  private reportKeys: string[] = badgeHashs.jest;
  
  public createReadme = (path: string = './README-template.md'): boolean => {
    if (fs.existsSync(path)) {
      fs.copyFileSync(path, 'README.md');
      console.log('\x1b[1m\x1b[32m', "Template read succesfully. 'README.md' created!");
      return true;
    } else {
      console.log('\x1b[1m\x1b[31m', "Error: 'README-template.md' file not not found.");
      console.log('\x1b[1m\x1b[32m', 'You must have a README-template.md created. Please read the documentation.');
      return false;
    }
  };
  
  public insertBadges = (path: string = './coverage/coverage-summary.json'): boolean => {
    let returnValue: boolean = false;
    if (fs.existsSync(path)) {
      const coverageFile = fs.readFileSync(path, 'utf8');
      if (!coverageFile.length) {
        console.log('\x1b[1m\x1b[31m', 'Malformed coverage report. Please run Jest again');
        return false;
      }
      const report: IReport = JSON.parse(coverageFile);
      const readmeFile: string = './README.md';
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
  
  public getBuildStatus = (path: string = './.buildstatus'): boolean => {
    let url: string = 'https://img.shields.io/badge/Building-Passing-brightgreen.svg'
    let returnValue: boolean = false
    const readmeFile: string = './README.md';
    const pattern: string = `#${badgeHashs.build}#`;
    if (fs.existsSync(path)) {
      let readmeFileData = fs.readFileSync(readmeFile, 'utf8');
      const buildStatus = fs.readFileSync(path, 'utf8')
      if (buildStatus === 'true') {
        url = 'https://img.shields.io/badge/Building-Passing-brightgreen.svg'
        returnValue = true
      } else if (buildStatus === 'false') {
        url = 'https://img.shields.io/badge/Building-Failing-brightred.svg'
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

  private getBadge = (report: IReport, key: string): string => {
    if (!(report && report.total && report.total[key])) {
      console.log('\x1b[1m\x1b[31m', 'Malformed coverage report for the key ' + key + '. Please run Jest again.');
      return '';
    }
    const coverage: number = report.total[key].pct;
    const colour = this.getColour(coverage);
    return `https://img.shields.io/badge/Coverage-${coverage}${encodeURI('%')}-${colour}.svg`;
  };

  private getColour = (coverage: number): string => {
    if (coverage < 80) {
      return 'red';
    }
    if (coverage < 90) {
      return 'yellow';
    }
    return 'brightgreen';
  };
}
