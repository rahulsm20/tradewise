const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: (process.env.USER),
  host: (process.env.HOST),
  database: (process.env.DATABASE),
  password:(process.env.PASSWORD),
  port: (process.env.PORT),
});
pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL server',err);
  } else {
    console.log('Connected to PostgreSQL server');
  }
});

module.exports= pool
