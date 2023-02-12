import { Router } from "express";

import{
    filterCustomersId,
    insertClient,
    listCustomers,
} from "../controllers/customers.controller.js"
import { newClientValidation } from "../middlewares/newClientValidation.js";
import { validateSchema } from "../middlewares/validadeSchema.js";
import { newClientSchema } from "../schemas/newClientSchema.js";

const customersRouter = Router()

customersRouter.use(newClientValidation)
customersRouter.get("/customers/:id",filterCustomersId)
customersRouter.get("/customers",listCustomers)
customersRouter.post("/customers",validateSchema(newClientSchema), insertClient)
export default customersRouter
