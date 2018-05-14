import * as Bluebird from "bluebird";
import * as GithubAPI from "@octokit/rest";
import * as _ from "lodash";

export class ProjectUtils {
  github: GithubAPI;
  owner: string;
  repo: string;

  public constructor(repo: string, public accessToken: string = process.env.GITHUB_ACCESS_TOKEN) {
    this.accessToken = accessToken;
    let repos = repo.split("/");
    this.owner = repos[0];
    this.repo = repos[1];

    this.github = new GithubAPI();
    this.github.authenticate({
      type: "oauth",
      token: accessToken
    })

  }

  getProjectList() {
    return this.github.projects.getRepoProjects({
      owner: this.owner,
      repo: this.repo
    })
  }

  getProjectByNumber(projectNo: number) {
    return new Bluebird((resolve, reject) => {
      this.getProjectList().then((projectsResponse) => {
        let targetProject = projectsResponse.data.filter(function(project: any) {
          return project.number === projectNo;
        });
        if (!targetProject) {
          reject(`project:${projectNo} is not found`);
        }
        resolve(targetProject[0]);
      }).catch((e) => {
        reject(["catch this.getProjectList error", e]);
      })
    })
  }

  collectProjectCardsAndColumn(projectNo: number) {
    return this.getProjectByNumber(projectNo)
      .then((project: any) => {
        return this.github.projects.getProjectColumns(<any>{ //FIXME: any
          project_id: project.id
        })
      })
      .then((columnsRsponse) => {
        let columnCardPromises: Array<Bluebird<any>> = [];
        columnsRsponse.data.forEach((column: any) => {
          columnCardPromises.push(new Bluebird((resolve, reject) => {
            this.github.projects.getProjectCards({
              column_id: column.id
            }).then((res: any) => {

              resolve({ column: column, cards: res.data });
            })
          }))
        });
        return Bluebird.all(columnCardPromises);
      });
  }

  searchCard(columnCards: Array<{ column: { name: string, id: number }, cards: Array<{ id: any, content_url: string, note?: string}> }>, issueNo: string): { column: any, card: { id: any, content_url: string } } {

    return _.head(
      _.chain(columnCards)
        .flatMap((v) => _.map(v.cards, (c) => {
          return { column: v.column, card: c }
        }))
        .filter((v) => !_.isEmpty(v.card.content_url) && v.card.content_url.endsWith("issues/" + issueNo))
        .value()
    );
  }

  moveTargetIssueToColumn(projectNo: number, issueNo: string, columnName: string) {
    return this.collectProjectCardsAndColumn(projectNo)
      .then((columns) => {
        return new Bluebird((resolve, reject) => {
          let destColumn = _.find(columns, (column) => {
            return column.column.name.toUpperCase() === columnName.toUpperCase();
          });
          if (!destColumn) {
            reject(`columnName : ${columnName} is not found`);
            return;
          }
          let srcColumnCard = this.searchCard(columns, issueNo);
          if (!srcColumnCard) {
            reject(`card(issueNo : ${issueNo}) is not found`);
            return;
          }
          if (srcColumnCard.column.id === destColumn.column.id) {
            resolve(`Issue ${issueNo} is alread exist in ${destColumn.column.name}`);
            return;
          }
          this.github.projects.moveProjectCard(<any>{//FIXME: any
            id: srcColumnCard.card.id,
            position: "bottom",
            column_id: destColumn.column.id
          })
            .then(resolve)
            .catch(reject)
        })
      });
  }
}
