export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  parent: number;
  text: string;
  poll: number;
  parts: number[];
}

export interface User {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

export enum StoryType {
  TOP = 'TOP',
  NEW = 'NEW',
  BEST = 'BEST',
  ASK = 'ASK',
  JOB = 'JOB',
  SHOW = 'SHOW',
}
