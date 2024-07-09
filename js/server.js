const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const cors = require('cors'); 
const port = 3000;

//Conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'paris',
    password: '1234',
    port: 5432
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('/'));

app.post('/save-score', async (req, res) => {
    const { username, score } = req.body;
    try {
        const result = await pool.query('INSERT INTO scores (username, score) VALUES ($1, $2) RETURNING *', [username, score]);
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
