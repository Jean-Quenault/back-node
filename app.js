const express = require('express')
const { Pool } = require('pg');
const bodyParser = require('body-parser')
const app = express()
const port = 4000

// Middleware for enabling Cross-Origin Resource Sharing (CORS)

const cors = require('cors');

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Creating a new pool of connections for the PostgreSQL database

const pool = new Pool({
  user: 'userdb',
  host: 'database-1.cskj8bkfqrhh.eu-west-3.rds.amazonaws.com',
  database: 'postgres',
  password: 'YBDyUHH3ClbYAY5rrVogUqM8MMHuyDhwtIC0Rtp',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});


// Endpoint for creating a new user

app.post('/users', (request, response) => {
  const { ip, navigateurs, os } = request.body;

  pool.query(
    'INSERT INTO app_user (ip, navigateurs, os) VALUES ($1, $2, $3)',
    [ip, navigateurs, os],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: 'success', message: 'Utilisateur ajouté.' });
    }
  );
});


// Endpoint for retrieving all users

app.get('/users', (request, response) => {
  pool.query('SELECT * FROM app_user ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

// Endpoint for the root URL, sending a welcome message in case of debbuging

app.get('/', (request, response) => {
  response.json({ info: 'Bienvenue sur le Jean backend'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
