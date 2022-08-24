import { CONTEXT, Inject, Injectable, Scope } from 'graphql-modules';
import { DataSourceConfig } from 'apollo-datasource';
import { RESTDataSource } from 'apollo-datasource-rest';
import 'reflect-metadata';
import { Item, User } from '../hn.types';

const addId = (a: any) => ({
  id: a,
});

const mapId = <T>(a: T[]) => a.map(addId);

@Injectable({
  scope: Scope.Operation,
})
export class HNProvider extends RESTDataSource {
  constructor(@Inject(CONTEXT) context: GraphQLModules.GlobalContext) {
    super();
    this.baseURL = process.env.HN_BASE_URL;
    this.initialize({ context } as DataSourceConfig<{}>);
  }

  private async idMappedResponse(path: string) {
    const resp = await this.get(path);

    return mapId(resp);
  }

  async getTopStories(): Promise<{ id: number }[]> {
    return await this.idMappedResponse('topstories.json?print=pretty');
  }

  async getNewStories(): Promise<{ id: number }[]> {
    return await this.idMappedResponse('newstories.json?print=pretty');
  }

  async getBestStories(): Promise<{ id: number }[]> {
    return await this.idMappedResponse('beststories.json?print=pretty');
  }

  async getAskStories(): Promise<{ id: number }[]> {
    return await this.idMappedResponse('askstories.json?print=pretty');
  }

  async getJobStories(): Promise<{ id: number }[]> {
    return await this.idMappedResponse('jobstories.json?print=pretty');
  }

  async getShowStories(): Promise<{ id: number }[]> {
    return await this.idMappedResponse('showstories.json?print=pretty');
  }

  async getItem(id: string): Promise<Item> {
    const resp = await this.get(`item/${id}.json?print=pretty`);

    const { kids, by, type, parts } = resp;

    const comments = kids ? mapId(kids) : null;
    const polloptions = type === 'poll' ? mapId(parts) : null;

    let result = {
      ...resp,
      by: { id: by },
    };

    if (comments) {
      result = { ...result, comments };
    }
    if (polloptions) {
      result = { ...result, polloptions };
    }

    return result;
  }

  async getUser(id: string): Promise<User> {
    const resp = await this.get(`user/${id}.json?print=pretty`);

    return {
      ...resp,
      submitted: mapId(resp.submitted),
    };
  }
}
