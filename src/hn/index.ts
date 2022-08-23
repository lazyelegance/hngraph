import { createModule, gql } from 'graphql-modules';
import { StoryProvider } from './hn.provider';

const typeDefs = gql`
  enum Type {
    job
    story
    comment
    poll
    pollopt
  }
  type Item {
    by: String
    descendants: Int
    id: Int
    kids: [Int]
    score: Int
    time: Int
    title: String
    type: Type
    url: String
  }
  type TopStory {
    id: ID!
    story: Item
  }
  type Query {
    getItem(id: ID!): Item
    topStories: [TopStory]
  }
`;

const resolvers = {
  Query: {
    getItem(
      root: unknown,
      { id }: { id: string },
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(StoryProvider).getItem(id);
    },
    topStories(
      r: unknown,
      args: unknown,
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(StoryProvider).getTopStories();
    },
  },
  TopStory: {
    story(
      { id }: { id: string },
      args: unknown,
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(StoryProvider).getItem(id);
    },
  },
};

export const hn = createModule({
  id: 'hn',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [StoryProvider],
});
