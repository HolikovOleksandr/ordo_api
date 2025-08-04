export const appConfiguration = () => ({
  port: process.env.PORT || 3001,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'ordo',
    password: process.env.DB_PASSWORD || 'ordo_password',
    name: process.env.DB_NAME || 'ordo_db'
  }
})
