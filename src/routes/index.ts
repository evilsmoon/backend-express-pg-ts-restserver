import {Router} from 'express';
import { getcommunitys } from '../controllers/index.controllers';
const router = Router();
router.get("/communitys", getcommunitys);
router.get("/users/:id", );

export default router;
