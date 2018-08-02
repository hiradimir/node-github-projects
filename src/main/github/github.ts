export namespace github.api {

  export interface User {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }

  export interface Project {
    owner_url: string;
    url: string;
    html_url: string;
    columns_url: string;
    id: number;
    name: string;
    body: string;
    number: number;
    state: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
  }

  export interface Column {
    url: string;
    project_url: string;
    cards_url: string;
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  }

  export interface Card {
    url: string;
    column_url: string;
    id: number;
    note?: any;
    creator: User;
    created_at: Date;
    updated_at: Date;
    content_url: string;
  }


  export interface User {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }

  export interface Label {
    id: number;
    url: string;
    name: string;
    color: string;
    default: boolean;
  }

  export interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: User;
    labels: Label[];
    state: string;
    locked: boolean;
    assignee?: any;
    assignees: any[];
    milestone?: any;
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at?: any;
    body: string;
    closed_by: User;
  }

}
