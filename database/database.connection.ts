import {Pool} from 'pg';


export class Database {

    connection = new Pool({
        user: '',
        host: '',
        database: '',
        password: '',
        port: 3000,
    });

}





