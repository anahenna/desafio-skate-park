
import { query, text } from 'express'
import {pool} from '../database/connection.js'

const findAll = async () => {
    const query = 'SELECT * FROM SKATERS'
    const {rows} =  await pool.query(query)
    return rows
}

const findOneByEmail = async (email) => {
    const query = {
        text:`
            SELECT * FROM SKATERS
            WHERE EMAIL = $1
        `,
        values: [email]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

const create = async ({email, nombre, password, anos_experiencia, especialidad, foto}) => {
    const query = {
        text: `
            INSERT INTO SKATERS(EMAIL, NOMBRE, PASSWORD, ANOS_EXPERIENCIA, ESPECIALIDAD, FOTO)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `,
        values: [email, nombre, password, anos_experiencia, especialidad, foto]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

const update = async(email, {nombre, password, anos_experiencia, especialidad}) => {
    const query = {
        text: `
            UPDATE SKATERS
            SET 
            nombre = $1,
            password = $2,
            anos_experiencia = $3,
            especialidad = $4
            WHERE email = $5
            RETURNING*;
        `,
        values: [nombre, password, anos_experiencia, especialidad, email]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}


const remove = async(email) => {
    const query = {
        text:`
            DELETE FROM skaters WHERE email = $1 RETURNING*;
        `,
        values: [email]

        }
    const {rows} = await pool.query(query)
    return rows[0]
}

const updateEstado = async(email, state)=>{
    const query = {
        text: `UPDATE skaters SET estado = $2 WHERE email = $1 RETURNING *;`,
        values: [email, state]
    }

    const { rows } = await pool.query(query);
    return rows[0]; 
}

export const UserModel = {
    findAll,
    findOneByEmail,
    create,
    update, 
    remove,
    updateEstado
}