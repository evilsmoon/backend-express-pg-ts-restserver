import { Pool } from "pg";

export const pool = new Pool ({

    user:'postgres',
    host:'localhost',
    password:'75315986245',
    database:'Integrador_dimensional',
    port:5432

})

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });