import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import fileUpload from 'express-fileupload'
import path from 'path';
import {verifyTokenJWT} from './middlewares/jwt.middleware.js'

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

app.use('/api/v1/users', userRoutes);

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
