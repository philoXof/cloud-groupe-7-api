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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_controller_1 = require("../controllers/image.controller");
const database_connection_1 = require("../database/database.connection");
const app = (0, express_1.default)();
app.get('/test', (req, res) => res.send('Coucou je suis la route de test'));
app.post("/add", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const url = req.body.url;
        if (firstname === undefined || lastname === undefined || url === undefined) {
            res.status(400).send('Missing attributes').end();
        }
        const db = yield new database_connection_1.Database();
        const imageController = yield new image_controller_1.ImageController(db);
        const imageAdded = yield imageController.add(firstname, lastname, url);
        if (imageAdded) {
            res.json(imageAdded);
            res.status(201).end();
        }
        else {
            res.status(404).end();
        }
    });
});
app.get("/images", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new database_connection_1.Database();
        const imageController = new image_controller_1.ImageController(db);
        const images = imageController.getAll();
        if (images) {
            res.json(images);
            res.status(201).end();
        }
        else {
            res.status(404).end();
        }
    });
});
exports.default = app;
