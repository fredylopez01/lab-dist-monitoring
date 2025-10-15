import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función principal para iniciar el servidor
async function startServer() {
  try {
    const app = express();
    const httpServer = http.createServer(app);
    
    // Crear el servidor Apollo
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    // Middleware
    app.use(cors());
    app.use(express.json());
    
    // Servir archivos estáticos desde /public
    app.use(express.static(join(__dirname, 'public')));
    
    // GraphQL endpoint
    app.use('/graphql', expressMiddleware(server));
    
    // Ruta raíz
    app.get('/', (req, res) => {
      res.sendFile(join(__dirname, 'public', 'index.html'));
    });

    // Health check para AWS
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', service: 'graphql-api' });
    });

    // Usar el puerto de la plataforma (AWS/Azure) o 4000 por defecto
    const PORT = process.env.PORT || 4000;
    
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

    console.log(`🚀 Servidor GraphQL listo en: http://localhost:${PORT}/graphql`);
    console.log(`🌐 Página principal: http://localhost:${PORT}/`);
    console.log(`📊 GraphQL Playground disponible en: http://localhost:${PORT}/graphql`);
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();