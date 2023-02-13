import {db} from '../database/database.connection.js'
import dayjs from 'dayjs'

export async function listRentals(req,res){

try {
    
    const rentals = await db.query(`SELECT rentals.*                   
         ,json_build_object(
            'id', customers.id,
            'name', customers.name) AS customer,
         json_build_object(
            'id', games.id,
            'name', games.name) AS game
    FROM rentals
    JOIN customers
    ON  rentals."customerId" = customers."id"
    JOIN games
        ON rentals."gameId" = games."id" 
    `);


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
    rentDate:dayjs().format("YYYY-MM-DD"),
    daysRented:daysRented,
    returnDate: null,
    originalPrice: game.rows[0].pricePerDay * daysRented,
    delayFee:null,

      } 

            await db.query(`INSERT INTO rentals( 
                "customerId", "gameId", "daysRented","rentDate","originalPrice", "returnDate", "delayFee") VALUES($1,$2,$3,$4,$5,$6,$7);`,[customerId, gameId, daysRented,objectRentals.rentDate,objectRentals.originalPrice,objectRentals.returnDate,objectRentals.delayFee])
                res.sendStatus(201)
    
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    export async function finishRental(req,res){
        const { id } = req.params
        
        try {

            const gameAvailable = await db.query(`SELECT * FROM games WHERE id = $1`,[id]);

            
   if(gameAvailable.rows[0].stockTotal === 0){

    return res.sendStatus(400)
   }

            const checkId = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id] )
            if( checkId.rowCount == 0) return res.sendStatus(404)
            if(checkId.rows[0].returnDate) return res.sendStatus(400)
            
        const returnDate = dayjs().format("YYYY-MM-DD")
        const dayDiff = dayjs(returnDate).diff(checkId.rows[0].rentDate,'day') - checkId.rows[0].daysRented
        const priceDay = ( checkId.rows[0].originalPrice / checkId.rows[0].daysRented ) 
        
        let delayFee= null   

        if(dayDiff > 0  ){
            delayFee = dayDiff * priceDay
        }
    
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`, [returnDate, delayFee, id])

        return res.sendStatus(200)

     } catch (error) {
        res.status(500).send(error.message)
     }   
    }


    export async function deleteRental(req,res){
        const { id } = req.params
     try {
       const checkId = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id] )
       if( checkId.rowCount == 0) return res.sendStatus(404)
       if(checkId.rows[0].returnDate !=null) return res.sendStatus(400)

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        return res.sendStatus(200)

     } catch (error) {
        res.status(500).send(error.message)
     }   
    }