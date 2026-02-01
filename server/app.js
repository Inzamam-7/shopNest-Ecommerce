import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))
import apiroutes from './routes/index.js'

app.use(apiroutes)

export default app