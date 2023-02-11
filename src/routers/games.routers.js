import { Router } from "express";

import {
listenGame,
insertGame,
} from '../controllers/games.controller.js';

const router = Router()


router.get("/games", listenGame);
router.post("/games",insertGame);

export default router;