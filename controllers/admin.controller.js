import {handleErrorsDatabase} from '../database/errors.database.js'
import { AdminModel } from '../models/admin.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AdminModel.findOneByEmail(email);

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
            { email: user.email, isAdmin: true }, // Agregar isAdmin: true para administradores
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
        const { email, password } = req.body;

        const newUser = await AdminModel.findOneByEmail(email);
        if (newUser) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya está registrado"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await AdminModel.create({
            email,
            password: hashPassword
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

    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorsDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
};

export const AdminController = {
    login,
    register
};