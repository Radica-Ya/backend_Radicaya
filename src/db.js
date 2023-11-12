import { createPool } from 'mysql2/promise.js';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, PORT } from './config.js'

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})
/*console.log(DB_HOST)
console.log(DB_USER)
console.log(DB_PASSWORD)
console.log(DB_PORT)
console.log(DB_DATABASE)
console.log('------- puerto que se esta ejecutando la api ----------------')
console.log(PORT)*/







