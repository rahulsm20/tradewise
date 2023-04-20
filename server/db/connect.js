const {Pool} = require('pg')
require('dotenv').config();
const pool = new Pool({
  user: (import.meta.env.DB_USERNAME),
  host: (import.meta.env.DB_HOST),
  database: (import.meta.env.DB),
  password: (import.meta.env.PASS),
  port: (import.meta.env.PORT),
});

pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL server',err);
  } else {
    console.log('Connected to PostgreSQL server');
  }
});

module.exports= pool
