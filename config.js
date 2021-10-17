const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'mvc',
    host: 'localhost',
    port: 5050
})

module.exports = pool