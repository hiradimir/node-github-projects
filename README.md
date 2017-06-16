# node-github-projects

[![Greenkeeper badge](https://badges.greenkeeper.io/hiradimir/node-github-projects.svg)](https://greenkeeper.io/)

[![CircleCI](https://circleci.com/gh/hiradimir/node-github-projects/tree/master.svg?style=svg)](https://circleci.com/gh/hiradimir/node-github-projects/tree/master)
[![codecov](https://codecov.io/gh/hiradimir/node-github-projects/branch/master/graph/badge.svg)](https://codecov.io/gh/hiradimir/node-github-projects)
[![dependencies](https://david-dm.org/hiradimir/node-github-projects.svg)](https://david-dm.org/hiradimir/node-github-projects)
[![devDependencies](https://david-dm.org/hiradimir/node-github-projects/dev-status.svg)](https://david-dm.org/hiradimir/node-github-projects#info=devDependencies)


This is provide to operating github projects simply.


This is using github REST API https://developer.github.com/v3/projects/


# feature

## move issue project column

```js
import * as GithubProjects from "node-github-projects";
let projectUtils = 
	new GithubProjects.ProjectUtils(
		"{#github repo}" /* ex) "hiradimir/node-github-projects" */, 
		githubAccessToken /* optional default process.ENV.GITHUB_ACCESS_TOKEN */);
projectUtils.moveTargetIssueToColumn(projectNo, issueNumber, '{#columnName}')
```

# LICENSE

This software is released under the MIT License, see LICENSE.txt.

