import * as assert from "power-assert"

import * as util from "../../main/index"
import * as _ from "lodash"
import Bluebird = require("bluebird");
import {github} from "../../main/github/github";

describe("util", () => {

  describe("ProjectUtils", ()=>{
    const githubUtil = new util.ProjectUtils(process.env.GITHUB_REPOS || "hiradimir/node-github-projects");

    describe("searchCard", ()=>{
      const columnCards: util.ColumnCards[] = <any>[
        {
          column: { name: "ToDo", id: 1 },
          cards: [
            { "id": 110, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/11" },
            { "id": 120, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/12" },
            { "id": 130, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/13" },
            { "id": 140, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/14" },
          ]
        },
        {
          column: { name: "InProgress", id: 2 },
          cards: [
            { "id": 210, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/21" },
            { "id": 220, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/22" },
            { "id": 230, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/23" },
            { "id": 240, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/24" },
            { "id": 250, "content_url": undefined },
          ]
        },
        {
          column: { name: "Review", id: 3 },
          cards: [
          ]
        },
        {
          column: { name: "Done", id: 4 },
          cards: [
            { "id": 410, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/41" },
            { "id": 420, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/42" },
            { "id": 430, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/43" },
            { "id": 440, "content_url": "https://api.github.com/repos/hiradimir/node-github-projects/issues/44" },
          ]
        }
      ];

      it("can find first row first card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "11")[0];
        assert(columnCard.card.id === 110);
        assert(columnCard.card.content_url === "https://api.github.com/repos/hiradimir/node-github-projects/issues/11")
      })
      it("can find first row second card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "12")[0];
        assert(columnCard.card.id === 120);
        assert(columnCard.card.content_url === "https://api.github.com/repos/hiradimir/node-github-projects/issues/12")
      })
      it("can find second row first card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "21")[0];
        assert(columnCard.card.id === 210);
        assert(columnCard.card.content_url === "https://api.github.com/repos/hiradimir/node-github-projects/issues/21")
      })
      it("can not find second row note", () => {
        let columnCard = githubUtil.searchCard(columnCards, "25")[0];
        assert(_.isUndefined(columnCard));
      })
      it("can not find not exists card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "31")[0];
        assert(_.isUndefined(columnCard));
      })
    })

    const describe_with_github: Mocha.SuiteFunction | Mocha.PendingSuiteFunction = "true" === process.env.ALLOW_UT_ACCESS_GITHUB ? describe : xdescribe;

    describe_with_github("with github real response", () => {
      it("getProjectByNumber", (done) => {
        githubUtil.getProjectByNumber(1).then((projects: github.api.Project[]) => {
          assert(_.size(projects) > 0);
          assert(!_.isUndefined(projects[0].id));
          done();
        }).catch(done)
      });

      describe("moveTargetIssueToColumn", ()=>{
        it("move to todo", (done) => {
          githubUtil.moveTargetIssueToColumn(1, "1", "todo").finally(done)
        });
        it("move to done", (done) => {
          githubUtil.moveTargetIssueToColumn(1, "1", "done").finally(done)
        });
        it("move to inprogress", (done) => {
          githubUtil.moveTargetIssueToColumn(1, "1", "inprogress").finally(done)
        });

      });

      describe("moveTargetIssueToColumnUnknownProject", () => {
        ["1", "43"].forEach((issueNo)=>{
          it("move to todo", (done) => {
            githubUtil.moveTargetIssueToColumnUnknownProject({ issueNo: issueNo, columnName: "todo" }).finally(done)
          });
          it("move to done", (done) => {
            githubUtil.moveTargetIssueToColumnUnknownProject({ issueNo: issueNo, columnName: "done" }).finally(done)
          });
          it("move to inprogress", (done) => {
            githubUtil.moveTargetIssueToColumnUnknownProject({ issueNo: issueNo, columnName: "inprogress" }).finally(done)
          })
        });
      });

    })

  })

})

