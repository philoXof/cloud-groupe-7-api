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
exports.ImageController = void 0;
const { Pool } = require("pg");
class ImageController {
    constructor(database) {
        this.database = database;
    }
    add(firstname, lastname, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (firstname === undefined || lastname === undefined || url === undefined) {
                return false;
            }
            const pool = new Pool(this.database.connection);
            const text = `INSERT INTO image (firstname, lastname, url) VALUES ($1, $2, $3);`;
            const values = [firstname, lastname, url];
            const request = yield pool.query(text, values);
            return request.rowCount;
        });
    }
    firstnameExists(firstname) {
        return __awaiter(this, void 0, void 0, function* () {
            if (firstname === undefined) {
                console.log("Firstname is undefined in controller");
                return false;
            }
            const pool = new Pool(this.database.connection);
            const text = `SELECT * FROM image WHERE firstname = $1;`;
            const values = [firstname];
            const request = yield pool.query(text, values);
            return request.rowCount != 0;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = new Pool(this.database.connection);
            const request = yield pool.query('select * from image');
            yield pool.end();
            return request.rows;
        });
    }
    getByFirstname(firstname) {
        return __awaiter(this, void 0, void 0, function* () {
            if (firstname === undefined) {
                console.log("Firstname is undefined in controller");
                return false;
            }
            const pool = new Pool(this.database.connection);
            const text = `SELECT * FROM image WHERE firstname = $1;`;
            const values = [firstname];
            const request = yield pool.query(text, values);
            return request.rows;
        });
    }
}
exports.ImageController = ImageController;
