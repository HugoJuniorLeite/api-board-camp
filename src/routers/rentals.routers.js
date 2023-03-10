import { Router } from "express";

import { deleteRental, finishRental, insertRentals, listRentals } from "../controllers/rentals.controler.js";
import { newRentalsValidation } from "../middlewares/newRentalsValidation.js";



import { validateSchema } from "../middlewares/validadeSchema.js";
import { newRentalSchema } from "../schemas/newRentalSchema.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.delete("/rentals/:id", deleteRental);
rentalsRouter.post("/rentals/:id/return", finishRental);
rentalsRouter.use(newRentalsValidation)
rentalsRouter.post("/rentals",validateSchema(newRentalSchema), insertRentals);
export default rentalsRouter;