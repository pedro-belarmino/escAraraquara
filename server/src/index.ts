import express from 'express'
import dotenv from 'dotenv'
import { connectToDataBase } from './lib/dbConnection'

async function start() {


    //carregar variaveis de ambiente
    dotenv.config({
        path: './.env'
    })


    // conectar no banco de dados
    await connectToDataBase()



    // criar uma nova aplicação express
    const app = express();
    app.get('/', (req, res) => {
        res.send('aoooo coisa boa')
    });

    app.listen(process.env.HTTP_PORT, () => {
        console.log('servidor rodando na porta -->' + process.env.HTTP_PORT)
    })
}