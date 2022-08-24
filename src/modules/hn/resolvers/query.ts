import { StoryType } from '../hn.types';
import { HNProvider } from '../providers/hn';

export default {
  Query: {
    getItem(
      root: unknown,
      { id }: { id: string },
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(HNProvider).getItem(id);
    },
    stories(
      r: unknown,
      { storyType }: { storyType: StoryType },
      { injector }: GraphQLModules.Context
    ) {
      switch (storyType) {
        case StoryType.TOP:
          return injector.get(HNProvider).getTopStories();
        case StoryType.ASK:
          return injector.get(HNProvider).getAskStories();
        case StoryType.JOB:
          return injector.get(HNProvider).getJobStories();
        case StoryType.SHOW:
          return injector.get(HNProvider).getShowStories();
        default:
          return injector.get(HNProvider).getTopStories();
      }
    },
    userById(
      root: unknown,
      { id }: { id: string },
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(HNProvider).getUser(id);
    },
  },
};
