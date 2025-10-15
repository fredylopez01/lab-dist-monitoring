import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

// Crear el servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Configuración adicional
  introspection: true, // Permite introspección en producción
  playground: true     // Habilita el playground
});

// Función principal para iniciar el servidor
async function startServer() {
  try {
    // Usar el puerto de la plataforma (AWS/Azure) o 4000 por defecto
    const PORT = process.env.PORT || 4000;
    
    // Iniciar el servidor
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT }
    });

    console.log(`🚀 Servidor GraphQL listo en: ${url}`);
    console.log(`📊 GraphQL Playground disponible en: ${url}`);
    console.log(`\n📝 Queries de ejemplo:`);
    console.log(`   • Obtener jugadores: { players { id name position team nationality } }`);
    console.log(`   • Obtener partidos: { matches { id homeTeam awayTeam homeScore awayScore competition } }`);
    console.log(`   • Obtener estadios: { stadiums { id name city country capacity } }`);
    console.log(`\n🔄 Mutaciones de ejemplo:`);
    console.log(`   • Crear jugador: mutation { createPlayer(input: { name: "Nuevo Jugador", position: "Delantero", team: "FC Example", age: 25, nationality: "España" }) { id name position team } }`);
    console.log(`   • Crear partido: mutation { createMatch(input: { homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 2, awayScore: 1, date: "2024-12-01T20:00:00Z", competition: "La Liga", stadiumId: "1" }) { id homeTeam awayTeam } }`);
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();