import {db} from "../database/database.connection.js"

export async function newClientValidation(req, res, next){

const {cpf} = req.body


try {
    const existCpf = await db.query(`SELECT * FROM games WHERE name = $1`,[cpf]);

 
   if(existCpf.rowCount > 0){

    return res.sendStatus(409)
   }

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}