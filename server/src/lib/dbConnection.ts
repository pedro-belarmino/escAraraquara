import mongoose from "mongoose"

export async function connectToDataBase() {
    const db = (await mongoose.connect(process.env.MONGODB_URI as string)).connection;

    db.on('error', console.error.bind(console, "erro na conexão, vai ver isso ai, banco de dados o BO"));

    db.once('open', function () {
        console.log('conectou no banco de dados, podemos comemorar aeee')
    })
    return db
}