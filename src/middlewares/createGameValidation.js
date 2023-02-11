import {db} from "../database/database.connection.js"

export async function createGameValidation(req, res, next){

const {name, image, stockTotal, pricePerDay } = req.body


try {
    const existName = await db.query(`SELECT * FROM games WHERE name = $1`,[name]);

    console.log(existName.rows.length > 0 )

   if(existName.rowCount > 0){

    return res.sendStatus(409)
   }
    //res.locals.session = checkSession

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}
//if( !name || stockTotal && pricePerDay <= 0) return res.sendStatus(400)

