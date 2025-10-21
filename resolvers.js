import { query } from './db.js';

export const resolvers = {
  Query: {
    // ========== PLAYERS ==========
    players: async () => {
      const sql = 'SELECT * FROM players ORDER BY id';
      return await query(sql);
    },

    player: async (_, { id }) => {
      const sql = 'SELECT * FROM players WHERE id = ?';
      const results = await query(sql, [id]);
      return results[0] || null;
    },

    playersByTeam: async (_, { team }) => {
      const sql = 'SELECT * FROM players WHERE team = ? ORDER BY id';
      return await query(sql, [team]);
    },

    playersByPosition: async (_, { position }) => {
      const sql = 'SELECT * FROM players WHERE position = ? ORDER BY id';
      return await query(sql, [position]);
    },

    // ========== MATCHES ==========
    matches: async () => {
      const sql = 'SELECT * FROM matches ORDER BY match_date DESC';
      return await query(sql);
    },

    match: async (_, { id }) => {
      const sql = 'SELECT * FROM matches WHERE id = ?';
      const results = await query(sql, [id]);
      return results[0] || null;
    },

    matchesByTeam: async (_, { team }) => {
      const sql = 'SELECT * FROM matches WHERE home_team = ? OR away_team = ? ORDER BY match_date DESC';
      return await query(sql, [team, team]);
    },

    matchesByCompetition: async (_, { competition }) => {
      const sql = 'SELECT * FROM matches WHERE competition = ? ORDER BY match_date DESC';
      return await query(sql, [competition]);
    },

    matchesByDate: async (_, { date }) => {
      const sql = 'SELECT * FROM matches WHERE DATE(match_date) = DATE(?) ORDER BY match_date';
      return await query(sql, [date]);
    },

    // ========== STADIUMS ==========
    stadiums: async () => {
      const sql = 'SELECT * FROM stadiums ORDER BY id';
      return await query(sql);
    },

    stadium: async (_, { id }) => {
      const sql = 'SELECT * FROM stadiums WHERE id = ?';
      const results = await query(sql, [id]);
      return results[0] || null;
    },

    stadiumsByCountry: async (_, { country }) => {
      const sql = 'SELECT * FROM stadiums WHERE country = ? ORDER BY id';
      return await query(sql, [country]);
    },

    // ========== PLAYER PERFORMANCES ==========
    playerPerformances: async () => {
      const sql = 'SELECT * FROM player_performances ORDER BY id';
      return await query(sql);
    },

    playerPerformance: async (_, { id }) => {
      const sql = 'SELECT * FROM player_performances WHERE id = ?';
      const results = await query(sql, [id]);
      return results[0] || null;
    },

    performancesByPlayer: async (_, { playerId }) => {
      const sql = 'SELECT * FROM player_performances WHERE player_id = ? ORDER BY id';
      return await query(sql, [playerId]);
    },

    performancesByMatch: async (_, { matchId }) => {
      const sql = 'SELECT * FROM player_performances WHERE match_id = ? ORDER BY id';
      return await query(sql, [matchId]);
    },
  },

  Mutation: {
    // ========== PLAYER MUTATIONS ==========
    createPlayer: async (_, { input }) => {
      const { name, position, team, age, nationality, goals = 0, assists = 0, matchesPlayed = 0 } = input;
      const sql = `
        INSERT INTO players (name, position, team, age, nationality, goals, assists, matches_played)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const result = await query(sql, [name, position, team, age, nationality, goals, assists, matchesPlayed]);
      
      // Get the created player
      const [newPlayer] = await query('SELECT * FROM players WHERE id = ?', [result.insertId]);
      return newPlayer;
    },

    updatePlayer: async (_, { input }) => {
      const { id, ...updates } = input;
      const fields = [];
      const values = [];

      // Build dynamic update query
      if (updates.name !== undefined) { fields.push('name = ?'); values.push(updates.name); }
      if (updates.position !== undefined) { fields.push('position = ?'); values.push(updates.position); }
      if (updates.team !== undefined) { fields.push('team = ?'); values.push(updates.team); }
      if (updates.age !== undefined) { fields.push('age = ?'); values.push(updates.age); }
      if (updates.nationality !== undefined) { fields.push('nationality = ?'); values.push(updates.nationality); }
      if (updates.goals !== undefined) { fields.push('goals = ?'); values.push(updates.goals); }
      if (updates.assists !== undefined) { fields.push('assists = ?'); values.push(updates.assists); }
      if (updates.matchesPlayed !== undefined) { fields.push('matches_played = ?'); values.push(updates.matchesPlayed); }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      const sql = `UPDATE players SET ${fields.join(', ')} WHERE id = ?`;
      await query(sql, values);

      const [updatedPlayer] = await query('SELECT * FROM players WHERE id = ?', [id]);
      return updatedPlayer;
    },

    deletePlayer: async (_, { id }) => {
      const sql = 'DELETE FROM players WHERE id = ?';
      const result = await query(sql, [id]);
      return result.affectedRows > 0;
    },

    // ========== MATCH MUTATIONS ==========
    createMatch: async (_, { input }) => {
      const { homeTeam, awayTeam, homeScore, awayScore, date, competition, stadiumId } = input;
      const sql = `
        INSERT INTO matches (home_team, away_team, home_score, away_score, match_date, competition, stadium_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const result = await query(sql, [homeTeam, awayTeam, homeScore, awayScore, date, competition, stadiumId]);
      
      const [newMatch] = await query('SELECT * FROM matches WHERE id = ?', [result.insertId]);
      return newMatch;
    },

    updateMatch: async (_, { input }) => {
      const { id, ...updates } = input;
      const fields = [];
      const values = [];

      if (updates.homeTeam !== undefined) { fields.push('home_team = ?'); values.push(updates.homeTeam); }
      if (updates.awayTeam !== undefined) { fields.push('away_team = ?'); values.push(updates.awayTeam); }
      if (updates.homeScore !== undefined) { fields.push('home_score = ?'); values.push(updates.homeScore); }
      if (updates.awayScore !== undefined) { fields.push('away_score = ?'); values.push(updates.awayScore); }
      if (updates.date !== undefined) { fields.push('match_date = ?'); values.push(updates.date); }
      if (updates.competition !== undefined) { fields.push('competition = ?'); values.push(updates.competition); }
      if (updates.stadiumId !== undefined) { fields.push('stadium_id = ?'); values.push(updates.stadiumId); }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      const sql = `UPDATE matches SET ${fields.join(', ')} WHERE id = ?`;
      await query(sql, values);

      const [updatedMatch] = await query('SELECT * FROM matches WHERE id = ?', [id]);
      return updatedMatch;
    },

    deleteMatch: async (_, { id }) => {
      const sql = 'DELETE FROM matches WHERE id = ?';
      const result = await query(sql, [id]);
      return result.affectedRows > 0;
    },

    // ========== STADIUM MUTATIONS ==========
    createStadium: async (_, { input }) => {
      const { name, city, country, capacity, yearBuilt } = input;
      const sql = `
        INSERT INTO stadiums (name, city, country, capacity, year_built)
        VALUES (?, ?, ?, ?, ?)
      `;
      const result = await query(sql, [name, city, country, capacity, yearBuilt || null]);
      
      const [newStadium] = await query('SELECT * FROM stadiums WHERE id = ?', [result.insertId]);
      return newStadium;
    },

    updateStadium: async (_, { input }) => {
      const { id, ...updates } = input;
      const fields = [];
      const values = [];

      if (updates.name !== undefined) { fields.push('name = ?'); values.push(updates.name); }
      if (updates.city !== undefined) { fields.push('city = ?'); values.push(updates.city); }
      if (updates.country !== undefined) { fields.push('country = ?'); values.push(updates.country); }
      if (updates.capacity !== undefined) { fields.push('capacity = ?'); values.push(updates.capacity); }
      if (updates.yearBuilt !== undefined) { fields.push('year_built = ?'); values.push(updates.yearBuilt); }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      const sql = `UPDATE stadiums SET ${fields.join(', ')} WHERE id = ?`;
      await query(sql, values);

      const [updatedStadium] = await query('SELECT * FROM stadiums WHERE id = ?', [id]);
      return updatedStadium;
    },

    deleteStadium: async (_, { id }) => {
      const sql = 'DELETE FROM stadiums WHERE id = ?';
      const result = await query(sql, [id]);
      return result.affectedRows > 0;
    },

    // ========== PLAYER PERFORMANCE MUTATIONS ==========
    createPlayerPerformance: async (_, { input }) => {
      const { playerId, matchId, goals = 0, assists = 0, minutesPlayed, yellowCards = 0, redCards = 0, rating } = input;
      const sql = `
        INSERT INTO player_performances (player_id, match_id, goals, assists, minutes_played, yellow_cards, red_cards, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const result = await query(sql, [playerId, matchId, goals, assists, minutesPlayed, yellowCards, redCards, rating || null]);
      
      const [newPerformance] = await query('SELECT * FROM player_performances WHERE id = ?', [result.insertId]);
      return newPerformance;
    },

    updatePlayerPerformance: async (_, { input }) => {
      const { id, ...updates } = input;
      const fields = [];
      const values = [];

      if (updates.goals !== undefined) { fields.push('goals = ?'); values.push(updates.goals); }
      if (updates.assists !== undefined) { fields.push('assists = ?'); values.push(updates.assists); }
      if (updates.minutesPlayed !== undefined) { fields.push('minutes_played = ?'); values.push(updates.minutesPlayed); }
      if (updates.yellowCards !== undefined) { fields.push('yellow_cards = ?'); values.push(updates.yellowCards); }
      if (updates.redCards !== undefined) { fields.push('red_cards = ?'); values.push(updates.redCards); }
      if (updates.rating !== undefined) { fields.push('rating = ?'); values.push(updates.rating); }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      const sql = `UPDATE player_performances SET ${fields.join(', ')} WHERE id = ?`;
      await query(sql, values);

      const [updatedPerformance] = await query('SELECT * FROM player_performances WHERE id = ?', [id]);
      return updatedPerformance;
    },

    deletePlayerPerformance: async (_, { id }) => {
      const sql = 'DELETE FROM player_performances WHERE id = ?';
      const result = await query(sql, [id]);
      return result.affectedRows > 0;
    },
  },

  // ========== NESTED RESOLVERS ==========
  Player: {
    matches: async (parent) => {
      const sql = `
        SELECT DISTINCT m.* FROM matches m
        INNER JOIN player_performances pp ON m.id = pp.match_id
        WHERE pp.player_id = ?
        ORDER BY m.match_date DESC
      `;
      return await query(sql, [parent.id]);
    },
  },

  Match: {
    stadium: async (parent) => {
      if (!parent.stadium_id) return null;
      const sql = 'SELECT * FROM stadiums WHERE id = ?';
      const results = await query(sql, [parent.stadium_id]);
      return results[0] || null;
    },
    playerPerformances: async (parent) => {
      const sql = 'SELECT * FROM player_performances WHERE match_id = ?';
      return await query(sql, [parent.id]);
    },
  },

  Stadium: {
    matches: async (parent) => {
      const sql = 'SELECT * FROM matches WHERE stadium_id = ? ORDER BY match_date DESC';
      return await query(sql, [parent.id]);
    },
  },

  PlayerPerformance: {
    player: async (parent) => {
      const sql = 'SELECT * FROM players WHERE id = ?';
      const results = await query(sql, [parent.player_id]);
      return results[0] || null;
    },
    match: async (parent) => {
      const sql = 'SELECT * FROM matches WHERE id = ?';
      const results = await query(sql, [parent.match_id]);
      return results[0] || null;
    },
  },
};
