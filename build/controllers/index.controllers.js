"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcommunitys = void 0;
const database_1 = require("../database");
exports.getcommunitys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield database_1.pool.query("select nombre_comunidad as ciudad,sum(cantidad)  as Cantidad from nacimientos ,ciudad where nacimientos.id_ciudad = ciudad.id_ciudad group by nombre_comunidad order by nombre_comunidad");
        return res.status(200).json(resp.rows);
    }
    catch (error) {
        return res.status(500).json("Internal Server Error" + error);
    }
});
