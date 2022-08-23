import { createApplication } from 'graphql-modules';
import { story } from './story';

export const application = createApplication({
  modules: [story],
});
