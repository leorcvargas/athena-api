export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  jwtSecret: process.env.JWT_SECRET,
  domain: process.env.DOMAIN,
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    sync: !!parseInt(process.env.DB_SYNC, 10) || false,
  },
  app: {
    authCookie: 'access_token',
  },
});
