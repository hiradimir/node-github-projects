import * as assert from "power-assert"

import * as util from "../../main/index"
import * as _ from "lodash"
import Bluebird = require("bluebird");

describe("util", () => {

  describe("ProjectUtils", ()=>{
    const githubUtil = new util.ProjectUtils(process.env.GITHUB_REPOS || "hiradimir/node-github-projects");

    describe("searchCard", ()=>{
      const columnCards = [
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
        let columnCard = githubUtil.searchCard(columnCards, "11");
        assert(columnCard.card.id === 110);
        assert(columnCard.card.content_url === "https://api.github.com/repos/hiradimir/node-github-projects/issues/11")
      })
      it("can find first row second card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "12");
        assert(columnCard.card.id === 120);
        assert(columnCard.card.content_url === "https://api.github.com/repos/hiradimir/node-github-projects/issues/12")
      })
      it("can find second row first card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "21");
        assert(columnCard.card.id === 210);
        assert(columnCard.card.content_url === "https://api.github.com/repos/hiradimir/node-github-projects/issues/21")
      })
      it("can not find second row note", () => {
        let columnCard = githubUtil.searchCard(columnCards, "25");
        assert(_.isUndefined(columnCard));
      })
      it("can not find not exists card", () => {
        let columnCard = githubUtil.searchCard(columnCards, "31");
        assert(_.isUndefined(columnCard));
      })
    })

    const describe_with_github: Mocha.IContextDefinition = "true" === process.env.ALLOW_UT_ACCESS_GITHUB ? describe : xdescribe;

    describe_with_github("with github real response", ()=>{
      it("getProjectByNumber", (done)=>{
        githubUtil.getProjectByNumber(1)
          .then((project: github.api.Project) => {
            assert(project.id !== 0);
            done();
          })
          .catch(done)
      });

      it("moveTargetIssueToColumn to todo", (done)=>{
        githubUtil.moveTargetIssueToColumn(1, "1", "todo")
          .finally(done)
      });
      it("moveTargetIssueToColumn to done", (done)=>{
        githubUtil.moveTargetIssueToColumn(1, "1", "done")
          .finally(done)
      });
      it("moveTargetIssueToColumn to inprogress", (done)=>{
        githubUtil.moveTargetIssueToColumn(1, "1", "inprogress")
          .finally(done)
      });

      it("moveTargetIssueToColumn to todo", (done)=>{
        githubUtil.moveTargetIssueToColumnUnknownProject({ issueNo: "1", columnName: "todo" })
        .finally(done)
      });
      it("moveTargetIssueToColumn to done", (done)=>{
        githubUtil.moveTargetIssueToColumnUnknownProject({ issueNo: "1", columnName: "done" })
        .finally(done)
      });
      it("moveTargetIssueToColumn to inprogress", (done)=>{
        githubUtil.moveTargetIssueToColumnUnknownProject({ issueNo: "1", columnName: "inprogress" })
        .finally(done)
      })
    })

  })

})

