import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import fileUpload from 'express-fileupload'
import path from 'path';
import {verifyTokenJWT} from './middlewares/jwt.middleware.js'
import { verifyTokenJWTadmin } from './middlewares/jwt.middleware.admin.js'

const app = express()
const __dirname = import.meta.dirname


app.use(cors())
app.use(fileUpload())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,  'public')));
app.use('/public/images', express.static('public/images'));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html')
})

app.get('/admin/login', (req, res) => {
    res.sendFile(__dirname + '/public/login_admin.html')
})

app.get('/admin/register', (req, res) => {
    res.sendFile(__dirname + '/public/register_admin.html')
})

app.get('/admin/dashboard', verifyTokenJWTadmin, (req, res) => {
    res.sendFile(__dirname + '/public/admin.html')
})


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admins', adminRoutes);

app.get('/datos', verifyTokenJWT, (req, res) => {
    // res.json({ validToken: true, email: req.email});
    res.sendFile(path.join(__dirname, 'public', 'datos.html'));
});


app.get('/protected', verifyTokenJWT, (req, res)=>{
    res.json({ validToken: true, email: req.email});
})

app.use('*', (req, res) => {
    res.status(404).json({ok: false, msg: 'ruta no configurada aún 🫥'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor andando en http://localhost:${PORT}`)
})
