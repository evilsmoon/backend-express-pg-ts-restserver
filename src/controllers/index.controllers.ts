import {Request,Response} from 'express';
import { pool } from '../database';
import {QueryResult} from 'pg';


export const getcommunitys = async (req:Request,res:Response):Promise<Response> =>{

    try {
        const resp : QueryResult = await pool.query("select nombre_comunidad as ciudad,sum(cantidad)  as Cantidad from nacimientos ,ciudad where nacimientos.id_ciudad = ciudad.id_ciudad group by nombre_comunidad order by nombre_comunidad");
        return res.status(200).json(resp.rows)
    } catch (error) {
        return res.status(500).json("Internal Server Error"+error);
    }
}