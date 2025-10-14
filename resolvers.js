import { 
  players,
  matches,
  stadiums,
  playerPerformances,
  generatePlayerId,
  generateMatchId,
  generateStadiumId,
  generatePerformanceId,
  findPlayerById,
  findMatchById,
  findStadiumById,
  findPerformanceById
} from './data.js';

export const resolvers = {
  // Resolvers para consultas (Queries)
  Query: {
    // Resolvers de Jugador
    players: () => players,
    player: (_, { id }) => findPlayerById(id),
    playersByTeam: (_, { team }) => players.filter(player => player.team === team),
    playersByPosition: (_, { position }) => players.filter(player => player.position === position),
    
    // Resolvers de Partido
    matches: () => matches,
    match: (_, { id }) => findMatchById(id),
    matchesByTeam: (_, { team }) => matches.filter(match => 
      match.homeTeam === team || match.awayTeam === team),
    matchesByCompetition: (_, { competition }) => matches.filter(match => 
      match.competition === competition),
    matchesByDate: (_, { date }) => matches.filter(match => 
      match.date.startsWith(date)),
    
    // Resolvers de Estadio
    stadiums: () => stadiums,
    stadium: (_, { id }) => findStadiumById(id),
    stadiumsByCountry: (_, { country }) => stadiums.filter(stadium => 
      stadium.country === country),
    
    // Resolvers de Actuaciones
    playerPerformances: () => playerPerformances,
    playerPerformance: (_, { id }) => findPerformanceById(id),
    performancesByPlayer: (_, { playerId }) => playerPerformances.filter(perf => 
      perf.playerId === playerId),
    performancesByMatch: (_, { matchId }) => playerPerformances.filter(perf => 
      perf.matchId === matchId),
  },

  // Resolvers para mutaciones (Mutations)
  Mutation: {
    // Mutaciones de Jugador
    createPlayer: (_, { input }) => {
      const newPlayer = {
        id: generatePlayerId(),
        name: input.name,
        position: input.position,
        team: input.team,
        age: input.age,
        nationality: input.nationality,
        goals: input.goals || 0,
        assists: input.assists || 0,
        matchesPlayed: input.matchesPlayed || 0
      };
      players.push(newPlayer);
      return newPlayer;
    },

    updatePlayer: (_, { input }) => {
      const playerIndex = players.findIndex(player => player.id === input.id);
      if (playerIndex === -1) {
        throw new Error(`Jugador con ID ${input.id} no encontrado`);
      }
      
      const updatedPlayer = {
        ...players[playerIndex],
        ...(input.name && { name: input.name }),
        ...(input.position && { position: input.position }),
        ...(input.team && { team: input.team }),
        ...(input.age !== undefined && { age: input.age }),
        ...(input.nationality && { nationality: input.nationality }),
        ...(input.goals !== undefined && { goals: input.goals }),
        ...(input.assists !== undefined && { assists: input.assists }),
        ...(input.matchesPlayed !== undefined && { matchesPlayed: input.matchesPlayed })
      };
      
      players[playerIndex] = updatedPlayer;
      return updatedPlayer;
    },

    deletePlayer: (_, { id }) => {
      const playerIndex = players.findIndex(player => player.id === id);
      if (playerIndex === -1) {
        return false;
      }
      
      // También eliminar las actuaciones del jugador
      const performancesToDelete = playerPerformances.filter(perf => perf.playerId === id);
      performancesToDelete.forEach(perf => {
        const perfIndex = playerPerformances.findIndex(p => p.id === perf.id);
        playerPerformances.splice(perfIndex, 1);
      });
      
      players.splice(playerIndex, 1);
      return true;
    },

    // Mutaciones de Partido
    createMatch: (_, { input }) => {
      // Verificar que el estadio existe
      const stadium = findStadiumById(input.stadiumId);
      if (!stadium) {
        throw new Error(`Estadio con ID ${input.stadiumId} no encontrado`);
      }

      const newMatch = {
        id: generateMatchId(),
        homeTeam: input.homeTeam,
        awayTeam: input.awayTeam,
        homeScore: input.homeScore,
        awayScore: input.awayScore,
        date: input.date,
        competition: input.competition,
        stadiumId: input.stadiumId
      };
      matches.push(newMatch);
      return newMatch;
    },

    updateMatch: (_, { input }) => {
      const matchIndex = matches.findIndex(match => match.id === input.id);
      if (matchIndex === -1) {
        throw new Error(`Partido con ID ${input.id} no encontrado`);
      }
      
      const updatedMatch = {
        ...matches[matchIndex],
        ...(input.homeTeam && { homeTeam: input.homeTeam }),
        ...(input.awayTeam && { awayTeam: input.awayTeam }),
        ...(input.homeScore !== undefined && { homeScore: input.homeScore }),
        ...(input.awayScore !== undefined && { awayScore: input.awayScore }),
        ...(input.date && { date: input.date }),
        ...(input.competition && { competition: input.competition }),
        ...(input.stadiumId && { stadiumId: input.stadiumId })
      };
      
      matches[matchIndex] = updatedMatch;
      return updatedMatch;
    },

    deleteMatch: (_, { id }) => {
      const matchIndex = matches.findIndex(match => match.id === id);
      if (matchIndex === -1) {
        return false;
      }
      
      // También eliminar las actuaciones del partido
      const performancesToDelete = playerPerformances.filter(perf => perf.matchId === id);
      performancesToDelete.forEach(perf => {
        const perfIndex = playerPerformances.findIndex(p => p.id === perf.id);
        playerPerformances.splice(perfIndex, 1);
      });
      
      matches.splice(matchIndex, 1);
      return true;
    },

    // Mutaciones de Estadio
    createStadium: (_, { input }) => {
      const newStadium = {
        id: generateStadiumId(),
        name: input.name,
        city: input.city,
        country: input.country,
        capacity: input.capacity,
        yearBuilt: input.yearBuilt || null
      };
      stadiums.push(newStadium);
      return newStadium;
    },

    updateStadium: (_, { input }) => {
      const stadiumIndex = stadiums.findIndex(stadium => stadium.id === input.id);
      if (stadiumIndex === -1) {
        throw new Error(`Estadio con ID ${input.id} no encontrado`);
      }
      
      const updatedStadium = {
        ...stadiums[stadiumIndex],
        ...(input.name && { name: input.name }),
        ...(input.city && { city: input.city }),
        ...(input.country && { country: input.country }),
        ...(input.capacity !== undefined && { capacity: input.capacity }),
        ...(input.yearBuilt !== undefined && { yearBuilt: input.yearBuilt })
      };
      
      stadiums[stadiumIndex] = updatedStadium;
      return updatedStadium;
    },

    deleteStadium: (_, { id }) => {
      const stadiumIndex = stadiums.findIndex(stadium => stadium.id === id);
      if (stadiumIndex === -1) {
        return false;
      }
      
      // Verificar si hay partidos programados en este estadio
      const matchesInStadium = matches.filter(match => match.stadiumId === id);
      if (matchesInStadium.length > 0) {
        throw new Error(`No se puede eliminar el estadio porque tiene partidos programados`);
      }
      
      stadiums.splice(stadiumIndex, 1);
      return true;
    },

    // Mutaciones de Actuación de Jugador
    createPlayerPerformance: (_, { input }) => {
      // Verificar que el jugador y el partido existen
      const player = findPlayerById(input.playerId);
      const match = findMatchById(input.matchId);
      
      if (!player) {
        throw new Error(`Jugador con ID ${input.playerId} no encontrado`);
      }
      if (!match) {
        throw new Error(`Partido con ID ${input.matchId} no encontrado`);
      }

      const newPerformance = {
        id: generatePerformanceId(),
        playerId: input.playerId,
        matchId: input.matchId,
        goals: input.goals || 0,
        assists: input.assists || 0,
        minutesPlayed: input.minutesPlayed,
        yellowCards: input.yellowCards || 0,
        redCards: input.redCards || 0,
        rating: input.rating || null
      };
      playerPerformances.push(newPerformance);
      return newPerformance;
    },

    updatePlayerPerformance: (_, { input }) => {
      const perfIndex = playerPerformances.findIndex(perf => perf.id === input.id);
      if (perfIndex === -1) {
        throw new Error(`Actuación con ID ${input.id} no encontrada`);
      }
      
      const updatedPerformance = {
        ...playerPerformances[perfIndex],
        ...(input.goals !== undefined && { goals: input.goals }),
        ...(input.assists !== undefined && { assists: input.assists }),
        ...(input.minutesPlayed !== undefined && { minutesPlayed: input.minutesPlayed }),
        ...(input.yellowCards !== undefined && { yellowCards: input.yellowCards }),
        ...(input.redCards !== undefined && { redCards: input.redCards }),
        ...(input.rating !== undefined && { rating: input.rating })
      };
      
      playerPerformances[perfIndex] = updatedPerformance;
      return updatedPerformance;
    },

    deletePlayerPerformance: (_, { id }) => {
      const perfIndex = playerPerformances.findIndex(perf => perf.id === id);
      if (perfIndex === -1) {
        return false;
      }
      playerPerformances.splice(perfIndex, 1);
      return true;
    }
  },

  // Resolvers para tipos anidados
  Player: {
    matches: (player) => {
      const playerMatches = playerPerformances
        .filter(perf => perf.playerId === player.id)
        .map(perf => findMatchById(perf.matchId))
        .filter(match => match !== undefined);
      return playerMatches;
    }
  },

  Match: {
    stadium: (match) => findStadiumById(match.stadiumId),
    playerPerformances: (match) => playerPerformances.filter(perf => perf.matchId === match.id)
  },

  Stadium: {
    matches: (stadium) => matches.filter(match => match.stadiumId === stadium.id)
  },

  PlayerPerformance: {
    player: (performance) => findPlayerById(performance.playerId),
    match: (performance) => findMatchById(performance.matchId)
  }
};