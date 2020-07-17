import { Pool } from "pg";
export const pool = new Pool ({

    user:'postgres',
    host:'localhost',
    password:'75315986245',
    database:'Base_relacional',
    port:5432

})