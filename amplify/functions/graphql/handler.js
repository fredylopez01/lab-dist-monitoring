import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { typeDefs } from '../../../schema.js';
import { resolvers } from '../../../resolvers.js';

// Crear el servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

// Exportar el handler para Lambda
export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
