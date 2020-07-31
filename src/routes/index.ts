import {Router} from 'express';
import { getcommunitys, getcommunitysMenor, getcommunitysMayor, getcommunityfather, getcommunitymother } from '../controllers/index.controllers';
const router = Router();
// Querys commnunitys
router.get("/communitys", getcommunitys);
// Query commmnuniys
// father
router.get("/communitymother/:id", getcommunitymother);
// mother
router.get("/communityfather/:id", getcommunityfather);

//querys 
router.get("/communitysmenor/:id", getcommunitysMenor);
router.get("/communitysmayor/:id", getcommunitysMayor);
export default router;
