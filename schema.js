export const typeDefs = `
  # Tipo Jugador de Fútbol
  type Player {
    id: ID!
    name: String!
    position: String!
    team: String!
    age: Int!
    nationality: String!
    goals: Int!
    assists: Int!
    matchesPlayed: Int!
    matches: [Match!]!
  }

  # Tipo Partido
  type Match {
    id: ID!
    homeTeam: String!
    awayTeam: String!
    homeScore: Int!
    awayScore: Int!
    date: String!
    competition: String!
    stadiumId: ID!
    stadium: Stadium!
    playerPerformances: [PlayerPerformance!]!
  }

  # Tipo Estadio
  type Stadium {
    id: ID!
    name: String!
    city: String!
    country: String!
    capacity: Int!
    yearBuilt: Int
    matches: [Match!]!
  }

  # Tipo Actuación del Jugador en un Partido
  type PlayerPerformance {
    id: ID!
    playerId: ID!
    player: Player!
    matchId: ID!
    match: Match!
    goals: Int!
    assists: Int!
    minutesPlayed: Int!
    yellowCards: Int!
    redCards: Int!
    rating: Float
  }

  # Inputs para las mutaciones
  input CreatePlayerInput {
    name: String!
    position: String!
    team: String!
    age: Int!
    nationality: String!
    goals: Int = 0
    assists: Int = 0
    matchesPlayed: Int = 0
  }

  input UpdatePlayerInput {
    id: ID!
    name: String
    position: String
    team: String
    age: Int
    nationality: String
    goals: Int
    assists: Int
    matchesPlayed: Int
  }

  input CreateMatchInput {
    homeTeam: String!
    awayTeam: String!
    homeScore: Int!
    awayScore: Int!
    date: String!
    competition: String!
    stadiumId: ID!
  }

  input UpdateMatchInput {
    id: ID!
    homeTeam: String
    awayTeam: String
    homeScore: Int
    awayScore: Int
    date: String
    competition: String
    stadiumId: ID
  }

  input CreateStadiumInput {
    name: String!
    city: String!
    country: String!
    capacity: Int!
    yearBuilt: Int
  }

  input UpdateStadiumInput {
    id: ID!
    name: String
    city: String
    country: String
    capacity: Int
    yearBuilt: Int
  }

  input CreatePlayerPerformanceInput {
    playerId: ID!
    matchId: ID!
    goals: Int = 0
    assists: Int = 0
    minutesPlayed: Int!
    yellowCards: Int = 0
    redCards: Int = 0
    rating: Float
  }

  input UpdatePlayerPerformanceInput {
    id: ID!
    goals: Int
    assists: Int
    minutesPlayed: Int
    yellowCards: Int
    redCards: Int
    rating: Float
  }

  # Queries - para consultar datos
  type Query {
    # Jugadores
    players: [Player!]!
    player(id: ID!): Player
    playersByTeam(team: String!): [Player!]!
    playersByPosition(position: String!): [Player!]!
    
    # Partidos
    matches: [Match!]!
    match(id: ID!): Match
    matchesByTeam(team: String!): [Match!]!
    matchesByCompetition(competition: String!): [Match!]!
    matchesByDate(date: String!): [Match!]!
    
    # Estadios
    stadiums: [Stadium!]!
    stadium(id: ID!): Stadium
    stadiumsByCountry(country: String!): [Stadium!]!
    
    # Actuaciones de Jugadores
    playerPerformances: [PlayerPerformance!]!
    playerPerformance(id: ID!): PlayerPerformance
    performancesByPlayer(playerId: ID!): [PlayerPerformance!]!
    performancesByMatch(matchId: ID!): [PlayerPerformance!]!
  }

  # Mutations - para modificar datos
  type Mutation {
    # Mutaciones de Jugador
    createPlayer(input: CreatePlayerInput!): Player!
    updatePlayer(input: UpdatePlayerInput!): Player!
    deletePlayer(id: ID!): Boolean!
    
    # Mutaciones de Partido
    createMatch(input: CreateMatchInput!): Match!
    updateMatch(input: UpdateMatchInput!): Match!
    deleteMatch(id: ID!): Boolean!
    
    # Mutaciones de Estadio
    createStadium(input: CreateStadiumInput!): Stadium!
    updateStadium(input: UpdateStadiumInput!): Stadium!
    deleteStadium(id: ID!): Boolean!
    
    # Mutaciones de Actuación de Jugador
    createPlayerPerformance(input: CreatePlayerPerformanceInput!): PlayerPerformance!
    updatePlayerPerformance(input: UpdatePlayerPerformanceInput!): PlayerPerformance!
    deletePlayerPerformance(id: ID!): Boolean!
  }
`;