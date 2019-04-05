export const badgeHashs = {
  buildFile: './.buildstatus',
  getBuildUrl: (left: string, right: string, color: string): string =>
    `https://img.shields.io/badge/${left}-${right}-${color}.svg`,
  getCoverageUrl: (coverage: number, color: string): string =>
    `https://img.shields.io/badge/Coverage-${coverage}${encodeURI('%')}-${color}.svg`,
  hashes: {
    build: 'buildstatus',
    jest: ['branches', 'functions', 'lines', 'statements'],
  },
  jsonCoverageFile: './coverage/coverage-summary.json',
  readmeFile: './README.md',
  readmeTemplateFile: './README-template.md',
};
