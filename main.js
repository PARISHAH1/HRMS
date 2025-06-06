const { Client } = require('pg');

const con = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5000,
    password: '1234', 
    database: 'Student'
});

con.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");

    return con.query('SELECT * FROM demotable');
  })
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.error('Error executing query', err.message);
  })
  .finally(() => {
    con.end();
  });