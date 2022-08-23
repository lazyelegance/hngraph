import { createApplication } from 'graphql-modules';
import { hn } from './hn';

export const application = createApplication({
  modules: [hn],
});
