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
    console.log(error);
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

/////////////////////////////////////////////////////////////////////////
export const getcommunityfather = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const client = await pool.connect();
    const resp: QueryResult = await pool.query(
      `select   n_edad_padre as Padre ,  sum(cantidad) as Cantidad   from fact_nacimientos as nacimientos ,  dim_ciudad as ciudad ,  dim_madre as edad_madre ,  dim_padre as edad_padre where nacimientos.sk_ciudad = ciudad.sk_ciudad  and nacimientos.sk_padre = edad_padre.sk_padre  and nacimientos.sk_madre =edad_madre.sk_madre  and nacimientos.sk_ciudad = ${parseInt(
        req.params.id
      )} group by Padre order by Padre`
    );
    return res.status(200).json(resp.rows);
    client.release();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error" + error);
  }
};

export const getcommunitymother = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const client = await pool.connect();
    const resp: QueryResult = await pool.query(
      `select n_edad_madre as Madre , sum(cantidad) as Cantidad from fact_nacimientos as nacimientos , dim_ciudad as ciudad , dim_madre as edad_madre , dim_padre as edad_padre where nacimientos.sk_ciudad = ciudad.sk_ciudad and nacimientos.sk_padre = edad_padre.sk_padre and nacimientos.sk_madre =edad_madre.sk_madre and nacimientos.sk_ciudad = ${parseInt(req.params.id)} group by Madre order by Madre`
    );
    return res.status(200).json(resp.rows);
    client.release();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error" + error);
  }
};

/////////////////////////////////////////////////////////////////////////

// select nombre_comunidad as Ciudad,  n_edad_padre as Padre , n_edad_madre as Madre, sum(cantidad) as cantidad  from fact_nacimientos as nacimientos , dim_ciudad as ciudad, dim_madre as edad_madre , dim_padre as edad_padre where nacimientos.sk_ciudad = ciudad.sk_ciudad and nacimientos.sk_padre = edad_padre.sk_padre and nacimientos.sk_madre =edad_madre.sk_madre group by nombre_comunidad ,n_edad_padre,n_edad_madre order by nombre_comunidad

// select nombre_comunidad as Ciudad,  sum(cantidad) as cantidad  from fact_nacimientos as nacimientos , dim_ciudad as ciudad where nacimientos.sk_ciudad = ciudad.sk_ciudad  group by nombre_comunidad  order by nombre_comunidad

// SELECT nombre_comunidad as Ciudad, sum(cantidad) as cantidad  from fact_nacimientos as nacimientos , dim_ciudad as ciudad where nacimientos.sk_ciudad = ciudad.sk_ciudad  GROUP BY nombre_comunidad HAVING sum(cantidad) > 50000 ORDER BY nombre_comunidad

// SELECT nombre_comunidad as Ciudad, sum(cantidad) as cantidad  from fact_nacimientos as nacimientos , dim_ciudad as ciudad where nacimientos.sk_ciudad = ciudad.sk_ciudad  GROUP BY nombre_comunidad HAVING sum(cantidad) < 1000  ORDER BY nombre_comunidad

// select nombre_comunidad as ciudad, n_edad_madre as madre, sum(cantidad) as cantidad from dim_ciudad , dim_madre,dim_padre,fact_nacimientos where fact_nacimientos.sk_ciudad = dim_ciudad.sk_ciudad and fact_nacimientos.sk_madre = dim_madre.sk_madre group by ciudad,madre order by ciudad,madre

// select nombre_comunidad as ciudad, sum(cantidad) as cantidad from dim_ciudad , dim_madre,dim_padre,fact_nacimientos where fact_nacimientos.sk_ciudad = dim_ciudad.sk_ciudad and fact_nacimientos.sk_padre = fact_nacimientos.sk_padre and fact_nacimientos.sk_madre = dim_madre.sk_madre group by ciudad order by ciudad



