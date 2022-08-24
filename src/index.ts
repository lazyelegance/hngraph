import { ApolloServer, gql } from 'apollo-server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { application } from './application';

const executor = application.createApolloExecutor();
const schema = application.schema;
import * as dotenv from 'dotenv';
dotenv.config();

const server = new ApolloServer({
  schema,
  executor,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: !!process.env.ENABLE_INTROSPECTION || false,
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
