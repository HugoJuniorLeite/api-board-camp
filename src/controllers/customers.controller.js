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
         return res.status(500).send(error.message)
      }
    }

    export async function insertClient(req, res){
      const {name, phone, cpf, birthday} = req.body

      try {
         const newClient = await db.query(`INSERT INTO customers( name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`,[name, phone, cpf,birthday])
         res.send(201)
      } catch (error) {
         res.status(500).send(error.message)
      }
    }