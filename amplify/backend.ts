import { defineBackend } from '@aws-amplify/backend';
import { graphqlApi } from './functions/graphql/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  graphqlApi,
});
