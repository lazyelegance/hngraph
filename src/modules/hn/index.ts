import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule, gql } from 'graphql-modules';
import { HNProvider } from './providers/hn';

export const hn = createModule({
  id: 'hn',
  dirname: __dirname,
  typeDefs: loadFilesSync(`${__dirname}/typedefs/*.gql`),
  resolvers: loadFilesSync(`${__dirname}/resolvers/*.ts`),
  providers: [HNProvider],
});
