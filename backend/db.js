const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BaseDatosPrueba2',
  password: '2526',
  port: '5433',
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};