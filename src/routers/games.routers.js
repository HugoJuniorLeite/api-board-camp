import { Router } from "express";

import {
listGame,
insertGame,
} from '../controllers/games.controller.js';
import { newGameValidation } from "../middlewares/newGameValidation.js";

import { validateSchema } from "../middlewares/validadeSchema.js";
import { newGameSchema } from "../schemas/newGameSchema.js";

const gamesRouter = Router()

gamesRouter.get("/games", listGame);
gamesRouter.use(newGameValidation);
gamesRouter.post("/games",validateSchema(newGameSchema) ,insertGame);

export default gamesRouter;