export namespace github.api {

  export namespace sample {

    export const login = {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    }

    export const project = {
      "owner_url": "https://api.github.com/repos/api-playground/projects-test",
      "url": "https://api.github.com/projects/1002604",
      "html_url": "https://github.com/api-playground/projects-test/projects/12",
      "columns_url": "https://api.github.com/projects/1002604/columns",
      "id": 1002604,
      "node_id": "MDc6UHJvamVjdDEwMDI2MDQ=",
      "name": "Projects Documentation",
      "body": "Developer documentation project for the developer site.",
      "number": 1,
      "state": "open",
      "creator": login,
      "created_at": "2011-04-10T20:09:31Z",
      "updated_at": "2014-03-03T18:58:10Z"
    }

    export const column = {
      "id": 367,
      "node_id": "MDEzOlByb2plY3RDb2x1bW4zNjc=",
      "name": "To Do",
      "url": "https://api.github.com/projects/columns/367",
      "project_url": "https://api.github.com/projects/120",
      "cards_url": "https://api.github.com/projects/columns/367/cards",
      "created_at": "2016-09-05T14:18:44Z",
      "updated_at": "2016-09-05T14:22:28Z"
    }

    export const card = {
      "url": "https://api.github.com/projects/columns/cards/1478",
      "column_url": "https://api.github.com/projects/columns/367",
      "content_url": "https://api.github.com/repos/api-playground/projects-test/issues/3",
      "id": 1478,
      "node_id": "MDExOlByb2plY3RDYXJkMTQ3OA==",
      "note": "Add payload for delete Project column",
      "creator": login,
      "created_at": "2016-09-05T14:21:06Z",
      "updated_at": "2016-09-05T14:20:22Z",
      "archived": false
    }

    export const repository = {
      "id": 1296269,
      "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
      "name": "Hello-World",
      "full_name": "octocat/Hello-World",
      "owner": login,
      "private": false,
      "html_url": "https://github.com/octocat/Hello-World",
      "description": "This your first repo!",
      "fork": true,
      "url": "https://api.github.com/repos/octocat/Hello-World",
      "archive_url": "http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
      "assignees_url": "http://api.github.com/repos/octocat/Hello-World/assignees{/user}",
      "blobs_url": "http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
      "branches_url": "http://api.github.com/repos/octocat/Hello-World/branches{/branch}",
      "collaborators_url": "http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
      "comments_url": "http://api.github.com/repos/octocat/Hello-World/comments{/number}",
      "commits_url": "http://api.github.com/repos/octocat/Hello-World/commits{/sha}",
      "compare_url": "http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
      "contents_url": "http://api.github.com/repos/octocat/Hello-World/contents/{+path}",
      "contributors_url": "http://api.github.com/repos/octocat/Hello-World/contributors",
      "deployments_url": "http://api.github.com/repos/octocat/Hello-World/deployments",
      "downloads_url": "http://api.github.com/repos/octocat/Hello-World/downloads",
      "events_url": "http://api.github.com/repos/octocat/Hello-World/events",
      "forks_url": "http://api.github.com/repos/octocat/Hello-World/forks",
      "git_commits_url": "http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
      "git_refs_url": "http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
      "git_tags_url": "http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
      "git_url": "git:github.com/octocat/Hello-World.git",
      "issue_comment_url": "http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
      "issue_events_url": "http://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
      "issues_url": "http://api.github.com/repos/octocat/Hello-World/issues{/number}",
      "keys_url": "http://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
      "labels_url": "http://api.github.com/repos/octocat/Hello-World/labels{/name}",
      "languages_url": "http://api.github.com/repos/octocat/Hello-World/languages",
      "merges_url": "http://api.github.com/repos/octocat/Hello-World/merges",
      "milestones_url": "http://api.github.com/repos/octocat/Hello-World/milestones{/number}",
      "notifications_url": "http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
      "pulls_url": "http://api.github.com/repos/octocat/Hello-World/pulls{/number}",
      "releases_url": "http://api.github.com/repos/octocat/Hello-World/releases{/id}",
      "ssh_url": "git@github.com:octocat/Hello-World.git",
      "stargazers_url": "http://api.github.com/repos/octocat/Hello-World/stargazers",
      "statuses_url": "http://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
      "subscribers_url": "http://api.github.com/repos/octocat/Hello-World/subscribers",
      "subscription_url": "http://api.github.com/repos/octocat/Hello-World/subscription",
      "tags_url": "http://api.github.com/repos/octocat/Hello-World/tags",
      "teams_url": "http://api.github.com/repos/octocat/Hello-World/teams",
      "trees_url": "http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
      "clone_url": "https://github.com/octocat/Hello-World.git",
      "mirror_url": "git:git.example.com/octocat/Hello-World",
      "hooks_url": "http://api.github.com/repos/octocat/Hello-World/hooks",
      "svn_url": "https://svn.github.com/octocat/Hello-World",
      "homepage": "https://github.com",
      "language": <string>null,
      "forks_count": 9,
      "stargazers_count": 80,
      "watchers_count": 80,
      "size": 108,
      "default_branch": "master",
      "open_issues_count": 0,
      "topics": [
        "octocat",
        "atom",
        "electron",
        "API"
      ],
      "has_issues": true,
      "has_projects": true,
      "has_wiki": true,
      "has_pages": false,
      "has_downloads": true,
      "archived": false,
      "pushed_at": "2011-01-26T19:06:43Z",
      "created_at": "2011-01-26T19:01:12Z",
      "updated_at": "2011-01-26T19:14:43Z",
      "permissions": {
        "admin": false,
        "push": false,
        "pull": true
      },
      "allow_rebase_merge": true,
      "allow_squash_merge": true,
      "allow_merge_commit": true,
      "subscribers_count": 42,
      "network_count": 0,
      "license": {
        "key": "mit",
        "name": "MIT License",
        "spdx_id": "MIT",
        "url": "https://api.github.com/licenses/mit",
        "node_id": "MDc6TGljZW5zZW1pdA=="
      }
    }

    export const milestone = {
      "url": "https://api.github.com/repos/octocat/Hello-World/milestones/1",
      "html_url": "https://github.com/octocat/Hello-World/milestones/v1.0",
      "labels_url": "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
      "id": 1002604,
      "node_id": "MDk6TWlsZXN0b25lMTAwMjYwNA==",
      "number": 1,
      "state": "open",
      "title": "v1.0",
      "description": "Tracking milestone for version 1.0",
      "creator": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "open_issues": 4,
      "closed_issues": 8,
      "created_at": "2011-04-10T20:09:31Z",
      "updated_at": "2014-03-03T18:58:10Z",
      "closed_at": "2013-02-12T13:22:01Z",
      "due_on": "2012-10-09T23:39:01Z"
    }

    export const label = {
      "id": 208045946,
      "node_id": "MDU6TGFiZWwyMDgwNDU5NDY=",
      "url": "https://api.github.com/repos/octocat/Hello-World/labels/bug",
      "name": "bug",
      "description": "Houston, we have a problem",
      "color": "f29513",
      "default": true
    }

    export const issue = {
      "id": 1,
      "node_id": "MDU6SXNzdWUx",
      "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      "repository_url": "https://api.github.com/repos/octocat/Hello-World",
      "labels_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}",
      "comments_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
      "events_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/events",
      "html_url": "https://github.com/octocat/Hello-World/issues/1347",
      "number": 1347,
      "state": "open",
      "title": "Found a bug",
      "body": "I'm having a problem with this.",
      "user": login,
      "labels": [label],
      "assignee": login,
      "assignees": [login],
      "milestone": milestone,
      "locked": true,
      "active_lock_reason": "too heated",
      "comments": 0,
      "pull_request": {
        "url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
        "html_url": "https://github.com/octocat/Hello-World/pull/1347",
        "diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff",
        "patch_url": "https://github.com/octocat/Hello-World/pull/1347.patch"
      },
      "closed_at": "2011-04-22T13:33:48Z",
      "created_at": "2011-04-22T13:33:48Z",
      "updated_at": "2011-04-22T13:33:48Z",
      "repository": repository
    }

  }


  export type User = typeof sample.login;

  export type Project = typeof sample.project;

  export type Column = typeof sample.column;

  export type Card = typeof sample.card;

  export type Label = typeof sample.label;

  export type Issue = typeof sample.issue;

}
