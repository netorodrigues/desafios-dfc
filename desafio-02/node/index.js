const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
};

const connection = mysql.createConnection(config);

app.get('/', (req, res) =>{
    var message = "<h1>Hello, express!</h1> </br> </br>";
    const sql = "SELECT name FROM people;";
    connection.query(sql,  function (error, results, fields) {
        if (error) throw error;
        results.forEach(element => {
            message += `<h2>${element.name}</h2></br>`;
        });
        
        res.send(message);
    });
    
    
    connection.end();
});


app.listen(port, () =>{
    console.log("rodando na porta " + port)
    
    function generateTable(){
        
        const createTableSQL = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));`
        connection.query(createTableSQL);
    }
    
    generateTable();

    const sql = "INSERT INTO people (name) values ('Nova-pessoa');"
    connection.query(sql);
})