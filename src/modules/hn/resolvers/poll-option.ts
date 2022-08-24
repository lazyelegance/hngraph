import { HNProvider } from '../providers/hn';

export default {
  PollOptionById: {
    polloption(
      { id }: { id: string },
      args: unknown,
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(HNProvider).getItem(id);
    },
  },
};
