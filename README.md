# node-github-projects

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

