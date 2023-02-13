import {db} from '../database/database.connection.js'
import dayjs from 'dayjs'

export async function listRentals(req,res){

try {
    const rentals = await db.query("SELECT * FROM rentals ")
 
   return res.send(rentals.rows)
} catch (error) {
   return res.status(500).send(error.message)
}
}


export async function insertRentals(req,res){
    const {customerId, gameId, daysRented} = req.body
    
        try {
            
            const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
            const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);

const objectRentals ={
    customerId:customerId,
    gameId:gameId,
    rentDate:dayjs().format("YYYY-MM-DD"),
    daysRented:daysRented,
    returnDate: null,
    originalPrice: game.rows[0].pricePerDay * daysRented,
    delayFee:null,
    customer: {
        id: customer.rows[0].id,
        name: customer.rows[0].name
       },
       game: {
         id: game.rows[0].id,
         name: game.rows[0].name
       }
     } 

            await db.query(`INSERT INTO rentals( 
                "customerId", "gameId", "daysRented","rentDate","originalPrice", "returnDate", "delayFee") VALUES($1,$2,$3,$4,$5,$6,$7);`,[customerId, gameId, daysRented,objectRentals.rentDate,objectRentals.originalPrice,objectRentals.returnDate,objectRentals.delayFee])
                res.sendStatus(201)
    
        } catch (error) {
            res.status(500).send(error.message)
        }
    }