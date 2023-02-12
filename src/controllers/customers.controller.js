import { db } from "../database/database.connection.js";

export async function listCustomers(req,res){

    try {
        const customers = await db.query("SELECT * FROM customers")
        
        return res.send(customers.rows)

     } catch (error) {
        return res.status(500).send(error.message)
     }
    }

    export async function filterCustomersId(req,res){
      const { id } = req.params

      try {
         const customersId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);

         if( customersId.rows.length === 0) {return res.sendStatus(404)}

         return res.send(customersId.rows[0])


      } catch (error) {
         return res.status(400).send(error.message)
      }
    }

    export async function insertClient(req, res){
      const {name, phone, cpf, birthday} = req.body

      try {
         const newClient = await db.query(`INSERT INTO customers( name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`,[name, phone, cpf,birthday])
         res.sendStatus(201)
      } catch (error) {
         res.status(500).send(error.message)
      }
    }



    export async function updateClient(req, res){
       const {name, phone, cpf, birthday} = req.body
       const { id } = req.params
console.log(id,"do update")
      try {
         const existCpf = await db.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf]);
    
   if(existCpf.rowCount !== 0 && existCpf.rows[0].id != id ){

    return res.sendStatus(409)
   }

         await db.query(`UPDATE customers set name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5  `,[name, phone, cpf,birthday, id])
         res.sendStatus(200)
      } catch (error) {
         res.status(500).send(error.message)
      }
    }    