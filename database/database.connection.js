"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    constructor() {
        this.connection = {
            user: 'dpagjlnqmyuhyz',
            host: 'ec2-52-31-201-170.eu-west-1.compute.amazonaws.com',
            database: 'd92tl06c0t4p0r',
            password: 'c13512880783a498b869f98684a366353c258dfccfdd7241572a1409b460646e',
            port: 5432,
            ssl: { rejectUnauthorized: false }
        };
    }
}
exports.Database = Database;
