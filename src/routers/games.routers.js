import { Router } from "express";

import {
listenGame,

} from '../controllers/games.controller.js';

const router = Router()


router.get("/games", listenGame);


export default router;