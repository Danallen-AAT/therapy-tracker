const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'world'
});

connection.connect((err) => {
    if (err) {
        console.warn(err);
        return
    }
    console.log('Connected to database')
});