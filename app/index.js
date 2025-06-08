const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Подключение к Postgres из ENV (будем брать из Vault через Secret)
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hello! Current time: ${result.rows[0].now}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

