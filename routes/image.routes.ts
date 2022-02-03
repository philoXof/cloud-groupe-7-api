import express from "express";
import {ImageController} from "../controllers/image.controller";
import {Database} from "../database/database.connection";


const app = express();

app.get('/test', (req, res) => res.send('Coucou je suis la route de test'));

app.post("/add", (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials','true');
    next();
},async function (req, res){

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const url = req.body.url;

    if(firstname === undefined || lastname === undefined || url === undefined){
        res.status(400).send('Missing attributes').end();
    }

    const db = await new Database();
    const imageController = new ImageController(db);

    const firstnameExists = await imageController.firstnameExists(firstname);
    if(firstnameExists){
        res.status(400).send('This firstname already exists').end();
        return;
    }

    const imageAdded = await imageController.add(firstname, lastname, url);

    if(imageAdded){
        res.send('User create successfully');
        res.status(201).end();
    } else {
        res.status(404).send('Internal Server Error').end();
    }

});


app.get("/images", (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials','true');
    next();
}, async function (req, res){


    const db = new Database();
    const imageController = new ImageController(db);

    const images = await imageController.getAll();

    if(images){
        res.json(images);
        res.status(201).end();
    } else {
        res.status(404).send('Internal Server Error').end();
    }

});

app.get("/images/:firstname",  (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials','true');
    next();
},async function (req, res){


    const firstname = req.params.firstname;

    if(firstname === undefined){
        res.status(400).send('Missing firstname').end();
    }

    const db = new Database();
    const imageController = new ImageController(db);

    const imagesByFirstname = await imageController.getByFirstname(firstname);

    if(imagesByFirstname){
        res.json(imagesByFirstname);
        res.status(201).end();
    } else {
        res.status(404).send('Internal Server Error').end();
    }

});

app.post("/mail",(req,res,next)=>{
    const body = JSON.stringify({
        "from": "Sender Name <sender@example.com>",
        "to": [
            "Recipient <ljehanno@myges.fr>"
        ],
        "test_mode": false,
        "subject": "Hello from CloudMailin 😃",
        "tags": [
            "api-tag",
            "cloudmailin-tag"
        ],
        "plain": "Hello Plain Text",
        "html": "<h1>Hello Html</h1>",
        "headers": {
            "x-api-test": "Test",
            "x-additional-header": "Value"
        },
        "attachments": [
            {
                "file_name": "pixel.png",
                "content": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0rdr1HwAFHwKCk87e6gAAAABJRU5ErkJggg==",
                "content_type": "image/png",
                "content_id": null
            }
        ]
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers,
        body,
    };

    fetch('https://api.cloudmailin.com/api/v0.1/4d8731b2f948c506/messages',requestOptions)
        .then( (res)=>console.log(res) )
        .catch( (e) => console.log(e) );

});

export default app;
