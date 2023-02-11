import {db} from "../database/database.connection.js"

export async function createGameValidation(req, res, next){

const {name} = req.body


try {
    const existName = await db.query(`SELECT * FROM games WHERE name = $1`,[name]);

    console.log(existName.rows.length > 0 )

   if(existName.rowCount > 0){

    return res.sendStatus(409)
   }

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}

