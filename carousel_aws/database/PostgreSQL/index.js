const { Client } = require('pg');
var connectionString = "postgres://localhost/carousel";
const client = new Client({
    connectionString: connectionString
});

client.connect();

module.exports = client;