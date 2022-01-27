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
class ImageController {
    constructor(database) {
        this.database = database;
    }
    add(firstname, lastname, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (firstname === undefined || lastname === undefined || url === undefined) {
                return null;
            }
            return yield this.database.connection.query(`INSERT INTO image VALUES(
                                                                                    ${lastname}, 
                                                                                    ${firstname}, 
                                                                                    ${url})`);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.database.connection.query("SELECT * from image");
            }
            catch (e) {
            }
            return;
        });
    }
}
exports.ImageController = ImageController;
