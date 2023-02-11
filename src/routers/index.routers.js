import { Router } from "express";
import gamesRouters from "./games.routers.js";

const router = Router();

router.use(gamesRouters);



export default router;  