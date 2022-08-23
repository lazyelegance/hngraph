import { createModule, gql } from 'graphql-modules';
import { StoryProvider } from './story.provider';

const typeDefs = gql`
  type Story {
    by: String
    descendants: Int
    id: Int
    kids: [Int]
    score: Int
    time: Int
    title: String
    type: String
    url: String
  }
  type TopStory {
    id: ID!
    story: Story
  }
  type Query {
    getStory(id: ID!): Story
    topStories: [TopStory]
  }
`;

const resolvers = {
  Query: {
    getStory(
      root: unknown,
      { id }: { id: string },
      { injector }: GraphQLModules.Context
    ) {
      return injector.get(StoryProvider).getStory(id);
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
      return injector.get(StoryProvider).getStory(id);
    },
  },
};

export const story = createModule({
  id: 'story',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [StoryProvider],
});
