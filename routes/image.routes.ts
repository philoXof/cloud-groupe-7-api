import express from "express";
import {ImageController} from "../controllers/image.controller";
import {Database} from "../database/database.connection";


const app = express();

app.get('/test', (req, res) => res.send('Coucou je suis la route de test'));


app.post("/add", async function (req, res){

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const url = req.body.url;

    if(firstname === undefined || lastname === undefined || url === undefined){
        res.status(400).send('Missing attributes').end();
    }

    const db = await new Database();
    const imageController = await new ImageController(db);

    const imageAdded = await imageController.add(firstname, lastname, url);

    if(imageAdded){
        res.json(imageAdded);
        res.status(201).end();
    } else {
        res.status(404).end();
    }

});


app.get("/images", async function (req, res){

    const db = new Database();
    const imageController = new ImageController(db);

    const images = imageController.getAll();

    if(images){
        res.json(images);
        res.status(201).end();
    } else {
        res.status(404).end();
    }

});


export default app;