import { HNProvider } from '../providers/hn';

export default {
  ItemById: {
    story(
      { id }: { id: string },
      args: unknown,
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(HNProvider).getItem(id);
    },
  },
};
