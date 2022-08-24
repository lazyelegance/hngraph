import { HNProvider } from '../providers/hn';

export default {
  UserById: {
    user(
      { id }: { id: string },
      args: unknown,
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(HNProvider).getUser(id);
    },
  },
};
