import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppassword',
  database: process.env.DB_NAME || 'football_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create connection pool
let pool;

export async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    console.log(`📊 Base de datos: ${dbConfig.database}`);
    console.log(`🖥️  Host: ${dbConfig.host}`);
    connection.release();
    
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    console.error('Intentando reconectar en 5 segundos...');
    
    // Retry connection after 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    return initDatabase();
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initDatabase() first.');
  }
  return pool;
}

// Helper function to execute queries
export async function query(sql, params = []) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Close pool
export async function closeDatabase() {
  if (pool) {
    await pool.end();
    console.log('🔌 Conexión a MySQL cerrada');
  }
}
