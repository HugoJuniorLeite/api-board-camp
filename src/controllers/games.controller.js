import {db} from '../database/database.connection.js'


export async function listenGame(req,res){

try {
    const game = await db.query("SELECT * FROM games ")
 
    res.send(game.rows)
} catch (error) {
    res.status(500).send(error.message)
}
}