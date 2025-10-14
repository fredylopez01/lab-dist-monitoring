// Datos quemados que simularán nuestra base de datos
let nextPlayerId = 8;
let nextMatchId = 6;
let nextStadiumId = 6;
let nextPerformanceId = 11;

// Array de jugadores de fútbol
export let players = [
  {
    id: "1",
    name: "Lionel Messi",
    position: "Extremo Derecho",
    team: "Inter Miami",
    age: 37,
    nationality: "Argentina",
    goals: 850,
    assists: 350,
    matchesPlayed: 1000
  },
  {
    id: "2",
    name: "Cristiano Ronaldo",
    position: "Delantero",
    team: "Al Nassr",
    age: 39,
    nationality: "Portugal",
    goals: 900,
    assists: 250,
    matchesPlayed: 1100
  },
  {
    id: "3",
    name: "Kylian Mbappé",
    position: "Delantero",
    team: "Real Madrid",
    age: 25,
    nationality: "Francia",
    goals: 300,
    assists: 150,
    matchesPlayed: 400
  },
  {
    id: "4",
    name: "Erling Haaland",
    position: "Delantero",
    team: "Manchester City",
    age: 24,
    nationality: "Noruega",
    goals: 200,
    assists: 50,
    matchesPlayed: 250
  },
  {
    id: "5",
    name: "Pedri",
    position: "Centrocampista",
    team: "FC Barcelona",
    age: 21,
    nationality: "España",
    goals: 25,
    assists: 80,
    matchesPlayed: 150
  },
  {
    id: "6",
    name: "Vinicius Jr",
    position: "Extremo Izquierdo",
    team: "Real Madrid",
    age: 24,
    nationality: "Brasil",
    goals: 100,
    assists: 120,
    matchesPlayed: 200
  },
  {
    id: "7",
    name: "Kevin De Bruyne",
    position: "Centrocampista",
    team: "Manchester City",
    age: 33,
    nationality: "Bélgica",
    goals: 150,
    assists: 300,
    matchesPlayed: 600
  }
];

// Array de estadios
export let stadiums = [
  {
    id: "1",
    name: "Santiago Bernabéu",
    city: "Madrid",
    country: "España",
    capacity: 81044,
    yearBuilt: 1947
  },
  {
    id: "2",
    name: "Camp Nou",
    city: "Barcelona",
    country: "España",
    capacity: 99354,
    yearBuilt: 1957
  },
  {
    id: "3",
    name: "Wembley Stadium",
    city: "Londres",
    country: "Inglaterra",
    capacity: 90000,
    yearBuilt: 2007
  },
  {
    id: "4",
    name: "Allianz Arena",
    city: "Múnich",
    country: "Alemania",
    capacity: 75000,
    yearBuilt: 2005
  },
  {
    id: "5",
    name: "Etihad Stadium",
    city: "Manchester",
    country: "Inglaterra",
    capacity: 53400,
    yearBuilt: 2002
  }
];

// Array de partidos históricos
export let matches = [
  {
    id: "1",
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelona",
    homeScore: 2,
    awayScore: 1,
    date: "2024-10-26T20:00:00Z",
    competition: "La Liga",
    stadiumId: "1"
  },
  {
    id: "2",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeScore: 1,
    awayScore: 1,
    date: "2024-10-20T16:30:00Z",
    competition: "Premier League",
    stadiumId: "5"
  },
  {
    id: "3",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: 3,
    awayScore: 1,
    date: "2024-10-15T18:30:00Z",
    competition: "Bundesliga",
    stadiumId: "4"
  },
  {
    id: "4",
    homeTeam: "Argentina",
    awayTeam: "Francia",
    homeScore: 4,
    awayScore: 2,
    date: "2022-12-18T15:00:00Z",
    competition: "Copa del Mundo",
    stadiumId: "3"
  },
  {
    id: "5",
    homeTeam: "FC Barcelona",
    awayTeam: "Paris Saint-Germain",
    homeScore: 6,
    awayScore: 1,
    date: "2017-03-08T20:45:00Z",
    competition: "Champions League",
    stadiumId: "2"
  }
];

// Array de actuaciones de jugadores en partidos
export let playerPerformances = [
  {
    id: "1",
    playerId: "1",
    matchId: "4",
    goals: 2,
    assists: 1,
    minutesPlayed: 120,
    yellowCards: 1,
    redCards: 0,
    rating: 9.5
  },
  {
    id: "2",
    playerId: "3",
    matchId: "1",
    goals: 1,
    assists: 0,
    minutesPlayed: 90,
    yellowCards: 0,
    redCards: 0,
    rating: 8.2
  },
  {
    id: "3",
    playerId: "6",
    matchId: "1",
    goals: 1,
    assists: 1,
    minutesPlayed: 85,
    yellowCards: 1,
    redCards: 0,
    rating: 8.7
  },
  {
    id: "4",
    playerId: "4",
    matchId: "2",
    goals: 0,
    assists: 1,
    minutesPlayed: 90,
    yellowCards: 0,
    redCards: 0,
    rating: 7.5
  },
  {
    id: "5",
    playerId: "7",
    matchId: "2",
    goals: 1,
    assists: 0,
    minutesPlayed: 90,
    yellowCards: 0,
    redCards: 0,
    rating: 8.0
  },
  {
    id: "6",
    playerId: "5",
    matchId: "5",
    goals: 1,
    assists: 2,
    minutesPlayed: 90,
    yellowCards: 0,
    redCards: 0,
    rating: 9.0
  },
  {
    id: "7",
    playerId: "1",
    matchId: "5",
    goals: 2,
    assists: 1,
    minutesPlayed: 90,
    yellowCards: 0,
    redCards: 0,
    rating: 9.8
  },
  {
    id: "8",
    playerId: "2",
    matchId: "3",
    goals: 2,
    assists: 0,
    minutesPlayed: 90,
    yellowCards: 1,
    redCards: 0,
    rating: 8.5
  },
  {
    id: "9",
    playerId: "3",
    matchId: "4",
    goals: 1,
    assists: 0,
    minutesPlayed: 90,
    yellowCards: 0,
    redCards: 0,
    rating: 7.8
  },
  {
    id: "10",
    playerId: "4",
    matchId: "3",
    goals: 1,
    assists: 1,
    minutesPlayed: 75,
    yellowCards: 0,
    redCards: 0,
    rating: 8.3
  }
];

// Funciones helper para generar IDs únicos
export const generatePlayerId = () => String(nextPlayerId++);
export const generateMatchId = () => String(nextMatchId++);
export const generateStadiumId = () => String(nextStadiumId++);
export const generatePerformanceId = () => String(nextPerformanceId++);

// Funciones helper para encontrar elementos
export const findPlayerById = (id) => players.find(player => player.id === id);
export const findMatchById = (id) => matches.find(match => match.id === id);
export const findStadiumById = (id) => stadiums.find(stadium => stadium.id === id);
export const findPerformanceById = (id) => playerPerformances.find(performance => performance.id === id);