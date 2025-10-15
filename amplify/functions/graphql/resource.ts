import { defineFunction } from '@aws-amplify/backend';

export const graphqlApi = defineFunction({
  name: 'graphql-api',
  entry: './handler.js',
  runtime: 18,
  timeoutSeconds: 30,
  memoryMB: 512,
});
