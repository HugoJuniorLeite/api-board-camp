import {db} from "../database/database.connection.js"

export async function newRentalsValidation(req, res, next){

const {gameId} = req.body


try {
    const gameAvailable = await db.query(`SELECT * FROM games WHERE id = $1`,[gameId]);

 //   console.log(existName.rows.length > 0 )

   if(gameAvailable.rows[0].stockTotal === 0){

    return res.sendStatus(400)
   }

    next()

  } catch (error) {
    res.sendStatus(400)
  }
}



