const express = require("express");
const app = express();
const port = 3000;
const libros = require("./libros.json");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})


app.get("/", (req, res) =>{
    res.send("Servidor funcionando!");
});

app.get("/otra_ruta", (req, res) =>{
    res.send("esta es otra ruta(otra_ruta");
});

app.get("/libros", (req, res) =>{
    res.send(libros);
});


app.listen(port, () => {
    console.log("Escuchando a http://localhost:" + port)
});