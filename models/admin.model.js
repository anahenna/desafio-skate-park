import {pool} from '../database/connection.js'

const findOneByEmail = async (email) => {
    const query = {
        text:`
            SELECT * FROM ADMINS
            WHERE EMAIL = $1
        `,
        values: [email]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

const create = async ({email, password}) => {
    const query = {
        text: `
            INSERT INTO ADMINS(EMAIL, PASSWORD)
            VALUES($1, $2)
            RETURNING *
        `,
        values: [email, password]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

export const AdminModel = {
    findOneByEmail,
    create
}