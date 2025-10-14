# API GraphQL de Fútbol con Historial de Partidos

Esta es una API GraphQL completa que incluye datos quemados (hardcoded) de jugadores de fútbol, partidos históricos, estadios y actuaciones de jugadores.

## 🚀 Características

- **Tipos**: Players (Jugadores), Matches (Partidos), Stadiums (Estadios) y PlayerPerformances (Actuaciones)
- **Datos quemados**: Arrays en memoria que simulan una base de datos de fútbol
- **Queries**: Consultar jugadores, partidos, estadios y actuaciones
- **Mutaciones**: Crear, actualizar y eliminar datos
- **Relaciones**: Los partidos están vinculados a estadios, los jugadores tienen actuaciones en partidos específicos
- **Despliegue Automático**: Integración con AWS Amplify mediante GitHub Actions

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Ejecutar el servidor

```bash
# Modo normal
npm start

# Modo desarrollo (con watch)
npm run dev
```

El servidor estará disponible en: `http://localhost:4000`

## 📊 Estructura de Datos

### Jugador (Player)
```graphql
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
```

### Partido (Match)
```graphql
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
```

### Estadio (Stadium)
```graphql
type Stadium {
  id: ID!
  name: String!
  city: String!
  country: String!
  capacity: Int!
  yearBuilt: Int
  matches: [Match!]!
}
```

### Actuación del Jugador (PlayerPerformance)
```graphql
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
```

## 📝 Queries de Ejemplo

### Obtener todos los jugadores
```graphql
query {
  players {
    id
    name
    position
    team
    age
    nationality
    goals
    assists
    matchesPlayed
  }
}
```

### Obtener jugadores por equipo
```graphql
query {
  playersByTeam(team: "Real Madrid") {
    id
    name
    position
    goals
    assists
    matches {
      id
      homeTeam
      awayTeam
      competition
    }
  }
}
```

### Obtener todos los partidos
```graphql
query {
  matches {
    id
    homeTeam
    awayTeam
    homeScore
    awayScore
    date
    competition
    stadium {
      name
      city
      country
    }
  }
}
```

### Obtener partidos por equipo
```graphql
query {
  matchesByTeam(team: "Real Madrid") {
    id
    homeTeam
    awayTeam
    homeScore
    awayScore
    competition
    stadium {
      name
    }
  }
}
```

### Obtener todos los estadios
```graphql
query {
  stadiums {
    id
    name
    city
    country
    capacity
    yearBuilt
    matches {
      id
      homeTeam
      awayTeam
      date
    }
  }
}
```

### Obtener actuaciones de un jugador
```graphql
query {
  performancesByPlayer(playerId: "1") {
    id
    goals
    assists
    minutesPlayed
    rating
    match {
      homeTeam
      awayTeam
      date
      competition
    }
  }
}
```

## 🔄 Mutaciones de Ejemplo

### Crear un nuevo jugador
```graphql
mutation {
  createPlayer(input: {
    name: "Jude Bellingham"
    position: "Centrocampista"
    team: "Real Madrid"
    age: 21
    nationality: "Inglaterra"
    goals: 50
    assists: 30
    matchesPlayed: 100
  }) {
    id
    name
    position
    team
    nationality
  }
}
```

### Actualizar estadísticas de un jugador
```graphql
mutation {
  updatePlayer(input: {
    id: "1"
    goals: 851
    assists: 351
  }) {
    id
    name
    goals
    assists
    team
  }
}
```

### Crear un nuevo partido
```graphql
mutation {
  createMatch(input: {
    homeTeam: "Real Madrid"
    awayTeam: "Atlético Madrid"
    homeScore: 3
    awayScore: 1
    date: "2024-12-01T20:00:00Z"
    competition: "La Liga"
    stadiumId: "1"
  }) {
    id
    homeTeam
    awayTeam
    homeScore
    awayScore
    stadium {
      name
    }
  }
}
```

### Crear un nuevo estadio
```graphql
mutation {
  createStadium(input: {
    name: "Nuevo Estadio"
    city: "Madrid"
    country: "España"
    capacity: 80000
    yearBuilt: 2024
  }) {
    id
    name
    city
    capacity
  }
}
```

### Crear actuación de jugador en un partido
```graphql
mutation {
  createPlayerPerformance(input: {
    playerId: "1"
    matchId: "1"
    goals: 2
    assists: 1
    minutesPlayed: 90
    yellowCards: 0
    redCards: 0
    rating: 9.5
  }) {
    id
    goals
    assists
    rating
    player {
      name
    }
    match {
      homeTeam
      awayTeam
    }
  }
}
```

### Eliminar un jugador
```graphql
mutation {
  deletePlayer(id: "1")
}
```

### Eliminar un partido
```graphql
mutation {
  deleteMatch(id: "1")
}
```

## 📁 Estructura del Proyecto

```
distribuidos/
├── package.json          # Configuración del proyecto
├── index.js              # Archivo principal del servidor
├── schema.js             # Definición de tipos GraphQL
├── resolvers.js          # Resolvers para queries y mutaciones
├── data.js               # Datos quemados y funciones helper
└── README.md             # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Apollo Server**: Servidor GraphQL
- **GraphQL**: Lenguaje de consulta
- **Node.js**: Runtime de JavaScript
- **ES Modules**: Sintaxis moderna de JavaScript

## 🎯 Datos de Ejemplo Incluidos

La API viene con datos de ejemplo de fútbol:
- 7 jugadores de fútbol famosos con estadísticas reales
- 5 estadios icónicos con información detallada
- 5 partidos históricos memorables
- 10 actuaciones específicas de jugadores en partidos

### Jugadores incluidos:
- Lionel Messi (Inter Miami)
- Cristiano Ronaldo (Al Nassr)
- Kylian Mbappé (Real Madrid)
- Erling Haaland (Manchester City)
- Pedri (FC Barcelona)
- Vinicius Jr (Real Madrid)
- Kevin De Bruyne (Manchester City)

### Estadios incluidos:
- Santiago Bernabéu (Madrid, España)
- Camp Nou (Barcelona, España)
- Wembley Stadium (Londres, Inglaterra)
- Allianz Arena (Múnich, Alemania)
- Etihad Stadium (Manchester, Inglaterra)

### Partidos históricos:
- Real Madrid vs FC Barcelona (El Clásico)
- Manchester City vs Liverpool (Premier League)
- Bayern Munich vs Borussia Dortmund (Der Klassiker)
- Argentina vs Francia (Final Mundial 2022)
- FC Barcelona vs PSG (Remontada histórica)

## 🔍 Explorar la API

Una vez que el servidor esté ejecutándose, puedes:
1. Ir a `http://localhost:4000` para acceder al Apollo Studio
2. Explorar el esquema en la pestaña "Schema"
3. Probar las queries y mutaciones en la pestaña "Operations"

---

## ☁️ Despliegue en AWS Amplify

Este proyecto está configurado para despliegue automático en AWS Amplify mediante GitHub Actions.

### Inicio Rápido

1. **Sube el código a GitHub**
2. **Crea una app en AWS Amplify** conectada a tu repositorio
3. **Configura secrets en GitHub** (credenciales de AWS)
4. **Haz push a `main`** y el despliegue ocurre automáticamente

### Documentación Completa

- **[QUICKSTART.md](./QUICKSTART.md)** - Pasos rápidos para desplegar (5-10 minutos)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa con todos los detalles

### Secrets Requeridos en GitHub

Configura estos secrets en **Settings > Secrets and variables > Actions**:

| Secret | Descripción |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Access Key de usuario IAM |
| `AWS_SECRET_ACCESS_KEY` | Secret Key de usuario IAM |
| `AWS_REGION` | Región de AWS (ej: `us-east-1`) |
| `AMPLIFY_APP_ID` | ID de tu app en Amplify |

### Workflow

El archivo `.github/workflows/deploy-aws.yml` se ejecuta automáticamente en cada push a `main`:

1. ✅ Instala dependencias
2. ✅ Ejecuta tests (si existen)
3. ✅ Configura credenciales de AWS
4. ✅ Despliega en AWS Amplify

---

## 📁 Estructura del Proyecto

```
.
├── .github/
│   └── workflows/
│       └── deploy-aws.yml    # GitHub Actions workflow
├── data.js                   # Datos quemados y funciones helper
├── schema.js                 # Definición del esquema GraphQL
├── resolvers.js              # Resolvers de queries y mutaciones
├── index.js                  # Servidor Apollo
├── package.json              # Dependencias
├── README.md                 # Este archivo
├── QUICKSTART.md             # Guía rápida de despliegue
├── DEPLOYMENT.md             # Guía completa de despliegue
└── .gitignore                # Archivos ignorados por Git
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

ISC