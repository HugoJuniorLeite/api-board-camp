import {db} from "../database/database.connection.js"

export async function newClientValidation(req, res, next){
const {cpf, phone} = req.body


//if( cpf.length !== 11){return res.sendStatus(400)}

 //if(phone.length <10 || phone.length >11) {return res.sendStatus(400)}

try {
    const existCpf = await db.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf]);

 //console.log(existCpf.rows)
   if(existCpf.rowCount > 0 && existCpf.rows[0].cpf !=cpf){

    return res.sendStatus(409)
   }

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}