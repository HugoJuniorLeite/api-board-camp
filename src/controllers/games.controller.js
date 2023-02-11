import {db} from '../database/database.connection.js'


export async function listenGame(req,res){

try {
    const game = await db.query("SELECT * FROM games ")
 
    res.send(game.rows)
} catch (error) {
    res.status(500).send(error.message)
}
}

export async function insertGame(req,res){
const {name, image, stockTotal,pricePerDay} = req.body

    try {
        const newGame = await db.query(`INSERT INFO games( 
            name, image, stockTotal,pricePerDay) VALUES($1,$2,$3,$4);`,[name, image, stockTotal,pricePerDay])
            res.send(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}