"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controllers/index.controllers");
const router = express_1.Router();
router.get("/communitys", index_controllers_1.getcommunitys);
router.get("/communitysmenor/:id", index_controllers_1.getcommunitysMenor);
router.get("/communitysmayor/:id", index_controllers_1.getcommunitysMayor);
exports.default = router;
