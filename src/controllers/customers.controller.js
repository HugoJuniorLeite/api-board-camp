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


         console.log(id,"id")
         return res.send(customersId.rows[0])


      } catch (error) {
         return res.status(404)
      }
    }