import * as Bluebird from "bluebird";
import * as GithubAPI from "@octokit/rest";
import * as _ from "lodash";
import {github} from "../github/github"

const GIT_TOKENS: any = {
  GITHUB_TOKEN: undefined,
  GITHUB_ACCESS_TOKEN: undefined,
  GIT_CREDENTIALS: undefined,
  GH_TOKEN: undefined
};

export type ColumnCards = {
  column: github.api.Column,
  cards: github.api.Card[]
}

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

  getProjectList(): Promise<{ data: github.api.Project[] }> {
    return this.github.projects.getRepoProjects({
      owner: this.owner,
      repo: this.repo
    })
  }

  getProjectByNumber(projectNo?: number): Bluebird<github.api.Project[]> {
    return new Bluebird<github.api.Project[]>((resolve, reject) => {
      this.getProjectList().then((projectsResponse) => {
        let targetProjects = projectsResponse.data.filter((project: any) => {
          if (projectNo) {
            return project.number === projectNo;
          } else {
            return true
          }
        });
        if (_.isEmpty(targetProjects)) {
          reject(`project:${projectNo} is not found`);
        }
        resolve(targetProjects);
      }).catch((e:any) => {
        reject(["catch this.getProjectList error", e]);
      })
    })
  }

  getProjectColumns(project: github.api.Project): Promise<{ data: github.api.Column[] }> {
    return this.github.projects.getProjectColumns(<any>{ //FIXME: any
      project_id: project.id
    })
  }

  collectProjectCardsAndColumn(projectNo?: number) {
    return this.getProjectByNumber(projectNo).then((projects) => {
      return Bluebird.all(projects.map((project) => {
        return this.getProjectColumns(project);
      }));

    }).then((columnsRsponses: { data: github.api.Column[] }[]) => {
      const columnCardPromises: Array<Bluebird<ColumnCards>> = [];
      columnsRsponses.forEach((columnsRsponse) => {
        columnsRsponse.data.forEach((column: any) => {
          columnCardPromises.push(new Bluebird<ColumnCards>((resolve, reject) => {
            this.github.projects.getProjectCards({
              column_id: column.id,
              per_page: 100
            }).then((res: any) => {
              resolve({ column: column, cards: res.data });
            }).catch((e) => {
              reject(e)
            });
          }))
        });
      })

      return Bluebird.all(columnCardPromises);
    });
  }

  searchCard(columnCards: ColumnCards[], issueNo: string) {

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

        srcColumnCards.forEach((srcColumnCard)=>{
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
