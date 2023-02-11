import { Router } from "express";

import{
    filterCustomersId,
    listCustomers,
} from "../controllers/customers.controller.js"

const customersRouter = Router()

customersRouter.get("/customers/:id",filterCustomersId)
customersRouter.get("/customers",listCustomers)

export default customersRouter
