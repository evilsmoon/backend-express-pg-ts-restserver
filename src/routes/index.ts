import {Router} from 'express';
import { getcommunitys ,getcommunitysMenor,getcommunitysMayor} from '../controllers/index.controllers';
const router = Router();
router.get("/communitys", getcommunitys);
router.get("/communitysmenor/:id", getcommunitysMenor);
router.get("/communitysmayor/:id", getcommunitysMayor);
export default router;
