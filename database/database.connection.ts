import {Pool} from 'pg';


export class Database {

    connection = new Pool({
        user: 'dpagjlnqmyuhyz',
        host: 'ec2-52-31-201-170.eu-west-1.compute.amazonaws.com',
        database: 'd92tl06c0t4p0r',
        password: 'c13512880783a498b869f98684a366353c258dfccfdd7241572a1409b460646e',
        port: 5432,
    });

}





