import { Router } from "express";

import {
listGame,
insertGame,
} from '../controllers/games.controller.js';
import { createGameValidation } from "../middlewares/createGameValidation.js";

import { validateSchema } from "../middlewares/validadeSchema.js";
import { newGameSchema } from "../schemas/newGameSchema.js";

const gamesRouter = Router()

gamesRouter.use(createGameValidation);
gamesRouter.get("/games", listGame);
gamesRouter.post("/games",validateSchema(newGameSchema) ,insertGame);

export default gamesRouter;