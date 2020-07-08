import * as fs from 'fs';

import { badgeHashs } from './constants';
import { IReport } from './interface';

const readmeFile: string = badgeHashs.readmeFile;
const readmeTemplateFile: string = badgeHashs.readmeTemplateFile;

export default class Helper {
  private reportKeys: Record<string, string>[] = badgeHashs.hashes.jest;

  public createReadme = (path: string = readmeTemplateFile): boolean => {
    if (fs.existsSync(path)) {
      fs.copyFileSync(path, readmeFile);
      console.log(`Template read succesfully. ${readmeFile} created!`);
      return true;
    }
    if (fs.existsSync(readmeFile)) {
      console.log(`Readme read succesfully. ${readmeFile} will be used accordingly!`);
      return true;
    }
    console.log(`Error: ${readmeTemplateFile} OR ${readmeFile} files were not found.`);
    console.log(
      `You must have a ${readmeTemplateFile} OR a valid ${readmeFile} file created. Please read the documentation.`,
    );
    return false;
  };

  public insertBadges = (path: string = badgeHashs.jsonCoverageFile): boolean => {
    let returnValue: boolean = false;
    const coveragePath = this.getCoveragePath(path);
    if (fs.existsSync(coveragePath)) {
      const coverageFile = fs.readFileSync(coveragePath, 'utf8');
      if (!coverageFile.length) {
        console.log('Malformed coverage report. Please run Jest again');
        return false;
      }
      console.log(`Reading coverage file from ${coveragePath}`);
      const report: IReport = JSON.parse(coverageFile);
      let readmeFileData: string = fs.readFileSync(readmeFile, 'utf8');
      let hadChange = 0;
      this.reportKeys.forEach((reportKey) => {
        const url: string = this.getBadge(report, reportKey.key);
        if (url.length) {
          const pattern: string = reportKey.value;

          const startIndex = readmeFileData.indexOf(pattern);
          const valueToChangeStart = readmeFileData.slice(startIndex + pattern.length + 1);

          const valueToChangeIndex = valueToChangeStart.indexOf(')');
          const valueToChangeFinal = valueToChangeStart.substring(0, valueToChangeIndex);

          const newUrl = `${url} "Make me better!"`;
          const isItTheSame = valueToChangeFinal.localeCompare(newUrl);

          readmeFileData = readmeFileData.replace(valueToChangeFinal, newUrl);

          if (isItTheSame !== 0) {
            console.log(`Badge for ${reportKey.key} updated with: ${url}`);
            hadChange = 1;
          }

          returnValue = true;
          fs.writeFileSync(readmeFile, readmeFileData, 'utf8');
        } else {
          returnValue = false;
        }
      });
      if (hadChange === 0) {
        console.log('No update on coverage!');
      }
      this.getBuildStatus();
    } else {
      console.log(`Error: ${coveragePath} file not found. Is it at the default location?`);
      console.log('Do you have Jest installed? If so, is it properly configured? If you do, then run me');
      console.log("by passing args i.e. npm run jest-badges-readme --coverageDir='my-custom-coverage-folder'");
      returnValue = false;
    }
    return returnValue;
  };

  public getBuildStatus = (path: string = badgeHashs.buildFile): boolean => {
    let url: string = badgeHashs.getBuildUrl('Build', 'Passing', 'brightgreen');
    let returnValue: boolean = false;
    const pattern: string = badgeHashs.hashes.build.value;
    if (fs.existsSync(path)) {
      let readmeFileData = fs.readFileSync(readmeFile, 'utf8');
      const buildStatus = fs.readFileSync(path, 'utf8');
      if (buildStatus === 'ok') {
        url = badgeHashs.getBuildUrl('Build', 'Passing', 'brightgreen');
        returnValue = true;
      } else if (buildStatus === 'nok') {
        url = badgeHashs.getBuildUrl('Build', 'Failing', 'brightred');
        returnValue = false;
      }

      const startIndex = readmeFileData.indexOf(pattern);
      const valueToChangeStart = readmeFileData.slice(startIndex + pattern.length + 1);

      const valueToChangeIndex = valueToChangeStart.indexOf(')');
      const valueToChangeFinal = valueToChangeStart.substring(0, valueToChangeIndex);

      const newUrl = `${url} "Building Status"`;

      readmeFileData = readmeFileData.replace(valueToChangeFinal, newUrl);

      fs.writeFileSync(readmeFile, readmeFileData, 'utf8');
      console.log(`Writing building status ${buildStatus}`);
    } else {
      returnValue = false;
    }
    return returnValue;
  };

  private getCoveragePath = (path: string): string => {
    let coveragePath: string = path;
    let argPath: string = '';
    const args = process.argv
      .filter((item) => {
        if (item.indexOf('coverage') >= 0) {
          return item;
        }
      })
      .toString();

    if (args) {
      argPath = args.replace('--coverageDir=', '');
    }

    if (argPath && args.length > 0) {
      coveragePath = `${argPath}/coverage-summary.json`;
    }

    return coveragePath;
  };

  private getBadge = (report: IReport, key: string): string => {
    if (!(report && report.total && report.total[key])) {
      console.log(`Malformed coverage report for the key ${key}. Please run Jest again.`);
      return '';
    }
    const coverage: number = report.total[key].pct;
    const color = this.getColor(coverage);
    return badgeHashs.getCoverageUrl(coverage, color);
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
