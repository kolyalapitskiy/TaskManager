import {Pool} from 'pg';

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.connect()
    .then(() => console.log("Database was succesfully connected!"))
    .catch((error) => console.log(error))
