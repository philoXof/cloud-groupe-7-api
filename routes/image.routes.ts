import express from "express";
import { ImageController } from "../controllers/image.controller";
import { Database } from "../database/database.connection";
import { AWSError } from "aws-sdk";
import { ListObjectsOutput } from "aws-sdk/clients/s3";

const AWS = require('aws-sdk');
const config = require('../config');

const app = express();

AWS.config.update(config.s3);
const s3 = new AWS.S3();

app.get('/test', (req, res) => res.send('Coucou je suis la route de test'));

app.get('/s3', function (req, res) {

    const params = {
        Bucket: config.s3.bucket,
        Delimiter: '/'
    };

    s3.listObjects(params, function (err: AWSError, data: ListObjectsOutput) {
        if (err) {
            res.send(err);
        } else {
            const images = [];
            console.log(data);
        }
    });
    res.status(200).end();
});

app.post("/add", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}, async function (req, res) {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const url = req.body.url;

    if (firstname === undefined || lastname === undefined || url === undefined) {
        res.status(400).send('Missing attributes').end();
    }

    const db = await new Database();
    const imageController = new ImageController(db);

    const firstnameExists = await imageController.firstnameExists(firstname);
    if (firstnameExists) {
        res.status(400).send('This firstname already exists').end();
        return;
    }

    const imageAdded = await imageController.add(firstname, lastname, url);

    if (imageAdded) {


       
        res.send('User create successfully');
        res.status(201).end();
    } else {
        res.status(404).send('Internal Server Error').end();
    }

});


app.get("/images", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}, async function (req, res) {


    const db = new Database();
    const imageController = new ImageController(db);

    const images = await imageController.getAll();

    if (images) {
        res.json(images);
        res.status(201).end();
    } else {
        res.status(404).send('Internal Server Error').end();
    }

});

app.get("/images/:firstname", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}, async function (req, res) {


    const firstname = req.params.firstname;

    if (firstname === undefined) {
        res.status(400).send('Missing firstname').end();
    }

    const db = new Database();
    const imageController = new ImageController(db);

    const imagesByFirstname = await imageController.getByFirstname(firstname);

    if (imagesByFirstname) {
        res.json(imagesByFirstname);
        res.status(201).end();
    } else {
        res.status(404).send('Internal Server Error').end();
    }

});

app.post("/mail", (req, res, next) => {


});

export default app;

