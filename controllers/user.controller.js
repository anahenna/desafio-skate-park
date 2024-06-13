import {handleErrorsDatabase} from '../database/errors.database.js'
import { UserModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import path from 'path';
import { fileURLToPath } from 'url';


const getUsers = async(req, res) =>{
    try{
        const users = await UserModel.findAll()
        return res.json(users)
    }catch(error){
        const {code, msg} = handleErrorsDatabase(error)
        return res.status(code).json({ok: false, msg })
    }
}

const getUser = async(req, res) => {
    try{
        const {email} = req.params
        const user = await UserModel.findOneByEmail(email)
        if (!user) {
            throw { code: 404, msg: 'Usuario no encontrado.' };
        }
        return res.json({user});
    }catch(error){
        const {code, msg} = handleErrorsDatabase(error)
        return res.status(code).json({ok: false, msg })
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOneByEmail(email);

        if (!user) return res.status(400).json({
            ok: false,
            msg: "El email no está registrado"
        });

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) return res.status(401).json({
            ok: false,
            msg: "Contraseña incorrecta"
        });

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_JWT,
            { expiresIn: '2m' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 60 * 1000 
        });

        return res.json({
            email: user.email
        });

    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorsDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
};


const register = async (req, res) => {
    try {
        const { email, nombre, password, anos_experiencia, especialidad } = req.body;

        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const file = req.files.imagen;
        const uploadPath = path.join(__dirname, '../public/images/', file.name);

        const newUser = await UserModel.findOneByEmail(email);
        if (newUser) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya está registrado"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        file.mv(uploadPath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            const user = await UserModel.create({
                email,
                nombre,
                password: hashPassword,
                anos_experiencia,
                especialidad,
                foto: `/public/images/${file.name}`
            });

            const token = jwt.sign(
                { email: user.email },
                process.env.SECRET_JWT,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token,
                email: user.email
            });

        });
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorsDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
};

const updateDatos =  async (req, res) => {
    try{
        const {email, nombre, password, anos_experiencia, especialidad} = req.body;

        const updateData = {nombre, anos_experiencia, especialidad}

        if(password){
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            updateData.password = hashPassword
        }

        const user = await UserModel.update(email, updateData);
        
        return res.json({ok: true, user})

    }catch(error){
        console.log(error)
        const { code, msg } = handleErrorsDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
};

const deleteAccount = async (req, res) => {
    try{
        const {email} =  req.body

        const user = await UserModel.remove(email)

        return res.json({ok: true, user})

    }catch(error){
        console.log(error)
        const { code, msg } = handleErrorsDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
};

const changeEstado = async(req, res) => {
    try {
        
        const { email, state} = req.body;

        const user = await UserModel.updateEstado(email, state);

        return res.json({ok: true, user});
    } catch (error) {
        console.error(error);
        return res.status(error.code.json({ok: false, msg: error.msg}));
    }
}


export const UserController ={
    getUsers,
    getUser,
    register,
    login,
    updateDatos,
    deleteAccount,
    changeEstado

}
