import {Database} from "../database/database.connection";

const { Pool } = require("pg");


export class ImageController {

    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public async add(firstname: string, lastname: string, url: string): Promise<boolean>{

        if(firstname === undefined || lastname === undefined || url === undefined){
            return false;
        }

        const pool = new Pool(this.database.connection);
        const text = `INSERT INTO image (firstname, lastname, url) VALUES ($1, $2, $3);`;
        const values = [firstname, lastname, url];

        const request = await pool.query(text, values);

        return request.rowCount;
    }


    public async firstnameExists(firstname: string): Promise<boolean>{
        if(firstname === undefined) {
            console.log("Firstname is undefined in controller");
            return false;
        }

        const pool = new Pool(this.database.connection);
        const text = `SELECT * FROM image WHERE firstname = $1;`;
        const values = [firstname];

        const request = await pool.query(text, values);

        return request.rowCount != 0;
    }


    public async getAll(){

        const pool = new Pool(this.database.connection);
        const request = await pool.query('select * from image');
        await pool.end();

        return request.rows;
    }

    public async getByFirstname(firstname: string){

        if(firstname === undefined) {
            console.log("Firstname is undefined in controller");
            return false;
        }

        const pool = new Pool(this.database.connection);
        const text = `SELECT * FROM image WHERE firstname = $1;`;
        const values = [firstname];

        const request = await pool.query(text, values);

        return request.rows;
    }



}