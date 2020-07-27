import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getcommunitys = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const client = await pool.connect();
    const resp: QueryResult = await pool.query(
      "select nombre_comunidad as ciudad, sum(cantidad) as cantidad from dim_ciudad , dim_madre,dim_padre,fact_nacimientos where fact_nacimientos.sk_ciudad = dim_ciudad.sk_ciudad and fact_nacimientos.sk_padre = fact_nacimientos.sk_padre and fact_nacimientos.sk_madre = dim_madre.sk_madre group by ciudad order by ciudad"
    );
    return res.status(200).json(resp.rows);
    client.release();
  } catch (error) {
    return res.status(500).json("Internal Server Error" + error);
  }
};

export const getcommunitysMenor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const client = await pool.connect();
    const resp: QueryResult = await pool.query(
      `select nombre_comunidad as ciudad, sum(cantidad) as cantidad from dim_ciudad , dim_madre,dim_padre,fact_nacimientos where fact_nacimientos.sk_ciudad = dim_ciudad.sk_ciudad and fact_nacimientos.sk_padre = fact_nacimientos.sk_padre and fact_nacimientos.sk_madre = dim_madre.sk_madre group by ciudad having sum(cantidad) <  ${parseInt(
        req.params.id
      )} order by ciudad`
    );
    return res.status(200).json(resp.rows);
    client.release();
  } catch (error) {
    return res.status(500).json("Internal Server Error" + error);
  }
};

export const getcommunitysMayor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const client = await pool.connect();
    const resp: QueryResult = await pool.query(
      `select nombre_comunidad as ciudad, sum(cantidad) as cantidad from dim_ciudad , dim_madre,dim_padre,fact_nacimientos where fact_nacimientos.sk_ciudad = dim_ciudad.sk_ciudad and fact_nacimientos.sk_padre = fact_nacimientos.sk_padre and fact_nacimientos.sk_madre = dim_madre.sk_madre group by ciudad having sum(cantidad) > ${parseInt(
        req.params.id
      )} order by ciudad`
    );
    return res.status(200).json(resp.rows);
    client.release();
  } catch (error) {
    return res.status(500).json("Internal Server Error" + error);
  }
};
