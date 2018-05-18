const { Client } = require('pg');



const db_connection = process.env.DATABASE_URL?
    {connectionString: process.env.DATABASE_URL, ssl:true } :
    {host: '/home/cc2012/ra138923/syndo-logistika/modulo-logistica/pgdb/', database: 'postgres'};
const client = new Client(db_connection);
client.connect();

exports.client = client;
