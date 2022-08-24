import { createApplication } from 'graphql-modules';
import { hn } from './modules/hn';

export const application = createApplication({
  modules: [hn],
});
