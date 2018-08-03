import * as Bluebird from "bluebird";
import * as GithubAPI from "@octokit/rest";
import * as _ from "lodash";


const GIT_TOKENS: any = {
  GITHUB_TOKEN: undefined,
  GITHUB_ACCESS_TOKEN: undefined,
  GIT_CREDENTIALS: undefined,
  GH_TOKEN: undefined
};


export class ProjectUtils {
  _github: GithubAPI;
  owner: string;
  repo: string;
  accessToken: string;

  public constructor(repo: string, accessToken?: string) {
    if(accessToken) {
      this.accessToken = accessToken
    } else {
      this.accessToken = process.env[Object.keys(GIT_TOKENS).find(envVar => !_.isUndefined(process.env[envVar]))]
    }

    let repos = repo.split("/");
    this.owner = repos[0];
    this.repo = repos[1];

  }

  get github(): GithubAPI {
    if(!this._github) {
      this._github = new GithubAPI();
      this._github.authenticate({
        type: "oauth",
        token: this.accessToken
      })
    }
    return this._github;
  }

  getProjectList() {
    return this.github.projects.getRepoProjects({
      owner: this.owner,
      repo: this.repo
    })
  }

  getProjectByNumber(projectNo?: number) {
    return new Bluebird((resolve, reject) => {
      this.getProjectList().then((projectsResponse) => {
        let targetProject = projectsResponse.data.filter((project: any) => {
          if (projectNo) {
            return project.number === projectNo;
          } else {
            return true
          }
        });
        if (_.isEmpty(targetProject)) {
          reject(`project:${projectNo} is not found`);
        }
        resolve(targetProject);
      }).catch((e) => {
        reject(["catch this.getProjectList error", e]);
      })
    })
  }

  collectProjectCardsAndColumn(projectNo?: number) {
    return this.getProjectByNumber(projectNo).then((projects: any[]) => {
      return Bluebird.all(projects.map((project) => {
        return this.github.projects.getProjectColumns(<any>{ //FIXME: any
          project_id: project.id
        })
      }));

    }).then((columnsRsponses: any[]) => {
      let columnCardPromises: Array<Bluebird<any>> = [];
      columnsRsponses.forEach((columnsRsponse) => {
        columnsRsponse.data.forEach((column: any) => {
          columnCardPromises.push(new Bluebird((resolve, reject) => {
            this.github.projects.getProjectCards({
              column_id: column.id
            }).then((res: any) => {
              resolve({ column: column, cards: res.data });
            })
          }))
        });
      })

      return Bluebird.all(columnCardPromises);
    });
  }

  searchCard(columnCards: Array<{ column: { name: string, id: number }, cards: Array<{ id: any, content_url: string, note?: string }> }>, issueNo: string): { column: any, card: { id: any, content_url: string } }[] {

    return _.chain(columnCards).flatMap((v) => _.map(v.cards, (c) => {
        return { column: v.column, card: c }
      })).filter((v) => !_.isEmpty(v.card.content_url) && v.card.content_url.endsWith("issues/" + issueNo)).value();
  }

  moveTargetIssueToColumnUnknownProject(params: { projectNo?: number, issueNo: string, columnName: string }) {
    return this.moveTargetIssueToColumn(params.projectNo, params.issueNo, params.columnName);
  }

  moveTargetIssueToColumn(projectNo: number, issueNo: string, columnName: string) {
    return this.collectProjectCardsAndColumn(projectNo).then((columns) => {
      return new Bluebird((resolve, reject) => {
        const destColumns = _.filter(columns, (column) => {
          return column.column.name.toUpperCase() === columnName.toUpperCase();
        });
        if (_.isEmpty(destColumns)) {
          reject(`columnName : ${columnName} is not found`);
          return;
        }
        const srcColumnCards = this.searchCard(columns, issueNo);
        if (_.isEmpty(srcColumnCards)) {
          reject(`card(issueNo : ${issueNo}) is not found`);
          return;
        }
        const project_srcColumn: {[index:string]: typeof srcColumnCards[0]} = {};

        srcColumnCards.map((srcColumnCard)=>{
          project_srcColumn[srcColumnCard.column.project_url] = srcColumnCard;
        });

        return Bluebird.all(destColumns.map((destColumn) => {

          return new Bluebird((resolve, reject) => {

            const srcColumnCard = project_srcColumn[destColumn.column.project_url];

            if(!srcColumnCard) {
              resolve(`srcColumnCard is not contains project`);
              return;
            }

            if (srcColumnCard.column.id === destColumn.column.id) {
              resolve(`Issue ${issueNo} is alread exist in ${destColumn.column.name}`);
              return;
            }

            if (srcColumnCard.column.project_url !== destColumn.column.project_url) {
              resolve(`Issue ${issueNo} is not added in ${destColumn.column.name}`);
              return;
            }

            return this.github.projects.moveProjectCard(<any>{//FIXME: any
              id: srcColumnCard.card.id,
              position: "bottom",
              column_id: destColumn.column.id
            }).then(resolve).catch(reject)
          })
        })).finally(resolve);

      })
    });
  }
}
