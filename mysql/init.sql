-- Create database if not exists
CREATE DATABASE IF NOT EXISTS football_db;
USE football_db;

-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    team VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    matches_played INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_team (team),
    INDEX idx_position (position),
    INDEX idx_nationality (nationality)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create stadiums table
CREATE TABLE IF NOT EXISTS stadiums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    year_built INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_country (country),
    INDEX idx_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    home_team VARCHAR(255) NOT NULL,
    away_team VARCHAR(255) NOT NULL,
    home_score INT NOT NULL,
    away_score INT NOT NULL,
    match_date DATETIME NOT NULL,
    competition VARCHAR(255) NOT NULL,
    stadium_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (stadium_id) REFERENCES stadiums(id) ON DELETE SET NULL,
    INDEX idx_home_team (home_team),
    INDEX idx_away_team (away_team),
    INDEX idx_competition (competition),
    INDEX idx_match_date (match_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create player_performances table
CREATE TABLE IF NOT EXISTS player_performances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    match_id INT NOT NULL,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    minutes_played INT NOT NULL,
    yellow_cards INT DEFAULT 0,
    red_cards INT DEFAULT 0,
    rating DECIMAL(3,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    INDEX idx_player_id (player_id),
    INDEX idx_match_id (match_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial data
INSERT INTO players (name, position, team, age, nationality, goals, assists, matches_played) VALUES
('Lionel Messi', 'Extremo Derecho', 'Inter Miami', 37, 'Argentina', 850, 350, 1000),
('Cristiano Ronaldo', 'Delantero', 'Al Nassr', 39, 'Portugal', 900, 250, 1100),
('Kylian Mbappé', 'Delantero', 'Real Madrid', 25, 'Francia', 300, 150, 400),
('Erling Haaland', 'Delantero', 'Manchester City', 24, 'Noruega', 200, 50, 250),
('Pedri', 'Centrocampista', 'FC Barcelona', 21, 'España', 25, 80, 150),
('Vinicius Jr', 'Extremo Izquierdo', 'Real Madrid', 24, 'Brasil', 100, 120, 200),
('Kevin De Bruyne', 'Centrocampista', 'Manchester City', 33, 'Bélgica', 150, 300, 600);

INSERT INTO stadiums (name, city, country, capacity, year_built) VALUES
('Santiago Bernabéu', 'Madrid', 'España', 81044, 1947),
('Camp Nou', 'Barcelona', 'España', 99354, 1957),
('Wembley Stadium', 'Londres', 'Inglaterra', 90000, 2007),
('Allianz Arena', 'Múnich', 'Alemania', 75000, 2005),
('Etihad Stadium', 'Manchester', 'Inglaterra', 53400, 2002);

INSERT INTO matches (home_team, away_team, home_score, away_score, match_date, competition, stadium_id) VALUES
('Real Madrid', 'FC Barcelona', 2, 1, '2024-10-26 20:00:00', 'La Liga', 1),
('Manchester City', 'Liverpool', 1, 1, '2024-10-20 16:30:00', 'Premier League', 5),
('Bayern Munich', 'Borussia Dortmund', 3, 1, '2024-10-15 18:30:00', 'Bundesliga', 4),
('Argentina', 'Francia', 4, 2, '2022-12-18 15:00:00', 'Copa del Mundo', 3),
('FC Barcelona', 'Paris Saint-Germain', 6, 1, '2017-03-08 20:45:00', 'Champions League', 2);

-- Grant privileges for monitoring
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
