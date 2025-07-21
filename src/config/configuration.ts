export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    user: process.env.DB_USER || 'ordo',
    password: process.env.DB_PASSWORD || 'ordo_password',
    name: process.env.DB_NAME || 'ordo_db'
  }
});


// docker exec -it ordo_api-db-1 psql -U postgres -c "
// DROP DATABASE IF EXISTS ordo_db;
// DROP USER IF EXISTS ordo;
// CREATE USER ordo WITH PASSWORD 'ordo_password';
// CREATE DATABASE ordo_db OWNER ordo;
// GRANT ALL PRIVILEGES ON DATABASE ordo_db TO ordo;
// "

