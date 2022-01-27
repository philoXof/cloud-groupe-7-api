import {Database} from "../database/database.connection";
import {QueryResult} from "pg";

export class ImageController {

    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }


    public async add(firstname: string, lastname: string, url: string): Promise<QueryResult | null>{

        if(firstname === undefined || lastname === undefined || url === undefined){
            return null;
        }

        return await this.database.connection.query(`INSERT INTO image VALUES(
                                                                                    ${lastname}, 
                                                                                    ${firstname}, 
                                                                                    ${url})`);
    }



    public async getAll(): Promise<QueryResult | undefined>{

        try {
            return await this.database.connection.query("SELECT * from image");
        } catch (e){
        }
        return;

    }

}