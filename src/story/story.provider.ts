import { CONTEXT, Inject, Injectable, Scope } from 'graphql-modules';
import { DataSourceConfig } from 'apollo-datasource';
import { RESTDataSource } from 'apollo-datasource-rest';
import 'reflect-metadata';

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
}

@Injectable({
  scope: Scope.Operation,
})
export class StoryProvider extends RESTDataSource {
  constructor(@Inject(CONTEXT) context: GraphQLModules.GlobalContext) {
    super();
    this.baseURL = process.env.HN_BASE_URL;
    this.initialize({ context } as DataSourceConfig<{}>);
  }

  async getTopStories(): Promise<{ id: number }[]> {
    const resp = await this.get('topstories.json?print=pretty');

    return resp.map((a: number) => ({
      id: a,
    }));
  }

  async getItem(id: string): Promise<Item> {
    const resp = await this.get(`item/${id}.json?print=pretty`);

    return resp;
  }
}
