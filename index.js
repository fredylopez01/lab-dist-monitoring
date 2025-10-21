import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { initDatabase, closeDatabase } from './db.js';
import { register, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';

// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics({ register });

// Custom metrics
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status', 'instance'],
  registers: [register]
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status', 'instance'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register]
});

const graphqlOperationsTotal = new Counter({
  name: 'graphql_operations_total',
  help: 'Total number of GraphQL operations',
  labelNames: ['operation_type', 'operation_name', 'instance'],
  registers: [register]
});

const graphqlOperationDuration = new Histogram({
  name: 'graphql_operation_duration_seconds',
  help: 'Duration of GraphQL operations in seconds',
  labelNames: ['operation_type', 'operation_name', 'instance'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2],
  registers: [register]
});

const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  labelNames: ['instance'],
  registers: [register]
});

const instanceInfo = new Gauge({
  name: 'instance_info',
  help: 'Information about the instance',
  labelNames: ['instance', 'version', 'node_version'],
  registers: [register]
});

const databaseConnections = new Gauge({
  name: 'database_connections',
  help: 'Number of database connections',
  labelNames: ['instance', 'state'],
  registers: [register]
});

// Get instance name from environment
const INSTANCE_NAME = process.env.INSTANCE_NAME || 'unknown';
const PORT = process.env.PORT || 4000;

// Set instance info
instanceInfo.labels(INSTANCE_NAME, '1.0.0', process.version).set(1);

// Create Express app
const app = express();
const httpServer = http.createServer(app);

// Middleware to track connections
app.use((req, res, next) => {
  activeConnections.labels(INSTANCE_NAME).inc();
  res.on('finish', () => {
    activeConnections.labels(INSTANCE_NAME).dec();
  });
  next();
});

// Middleware to track HTTP metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestsTotal.labels(req.method, route, res.statusCode.toString(), INSTANCE_NAME).inc();
    httpRequestDuration.labels(req.method, route, res.statusCode.toString(), INSTANCE_NAME).observe(duration);
  });
  
  next();
});

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    {
      async requestDidStart() {
        const start = Date.now();
        let operationType = 'unknown';
        let operationName = 'unknown';

        return {
          async didResolveOperation(requestContext) {
            operationType = requestContext.operation.operation;
            operationName = requestContext.operationName || 'anonymous';
          },
          async willSendResponse() {
            const duration = (Date.now() - start) / 1000;
            graphqlOperationsTotal.labels(operationType, operationName, INSTANCE_NAME).inc();
            graphqlOperationDuration.labels(operationType, operationName, INSTANCE_NAME).observe(duration);
          },
        };
      },
    },
  ],
});

// Start server
async function startServer() {
  try {
    // Initialize database connection
    console.log('🔌 Conectando a MySQL...');
    await initDatabase();

    // Start Apollo Server
    await server.start();

    // Apply middleware
    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(server)
    );

    // Metrics endpoint for Prometheus
    app.get('/metrics', async (req, res) => {
      try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
      } catch (error) {
        res.status(500).end(error);
      }
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        instance: INSTANCE_NAME,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected'
      });
    });

    // Apollo health check
    app.get('/.well-known/apollo/server-health', (req, res) => {
      res.status(200).send('OK');
    });

    // Info endpoint
    app.get('/info', (req, res) => {
      res.json({
        instance: INSTANCE_NAME,
        version: '1.0.0',
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        database: {
          host: process.env.DB_HOST || 'localhost',
          name: process.env.DB_NAME || 'football_db'
        }
      });
    });

    // Start HTTP server
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🚀 Servidor GraphQL listo en: http://localhost:' + PORT + '/graphql');
    console.log('📊 Métricas Prometheus: http://localhost:' + PORT + '/metrics');
    console.log('💚 Health check: http://localhost:' + PORT + '/health');
    console.log('ℹ️  Info: http://localhost:' + PORT + '/info');
    console.log('🏷️  Instancia: ' + INSTANCE_NAME);
    console.log('🗄️  Base de datos: MySQL (' + (process.env.DB_HOST || 'localhost') + ')');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('📝 Queries de ejemplo:');
    console.log('   • { players { id name position team } }');
    console.log('   • { matches { id homeTeam awayTeam competition } }');
    console.log('   • { stadiums { id name city country capacity } }');
    console.log('');
    console.log('🔄 Mutaciones de ejemplo:');
    console.log('   • mutation { createPlayer(input: { name: "Nuevo", position: "Forward", team: "FC Test", age: 25, nationality: "España" }) { id name } }');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown
async function shutdown(signal) {
  console.log(`\n${signal} signal received: closing HTTP server`);
  
  httpServer.close(async () => {
    console.log('HTTP server closed');
    
    try {
      await closeDatabase();
      console.log('✅ Shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  shutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('UNHANDLED_REJECTION');
});

// Start the server
startServer();
