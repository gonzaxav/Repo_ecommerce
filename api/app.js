<<<<<<< Updated upstream
const cart_buy = require("./json/cart/buy.json");
const cart_info = require("./json/cart/987.json");
const cart_info2 = require("./json/cart/654.json");
const categories_url = require("./json/category/all.json");
const category_info = require("./json/category/1234.json");
const product_info_comments = require("./json/product/5678-comments.json");
const product_info = require("./json/product/5678.json");
const products_url = require("./json/product/all.json");
const publish_product = require("./json/product/publish.json");

const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");

app.use(express.static(__dirname + "/static"));
app.use(express.json());

app.get("/json/cart_buy", (req, res) =>{
    res.send(cart_buy);
});

app.get("/json/cart_info", (req, res) =>{
    res.send(cart_info);
});

app.get("/json/cart_info2", (req, res) =>{
    res.send(cart_info2);
});

app.get("/json/categories_url", (req, res) =>{
    res.send(categories_url);
});

app.get("/json/category_info", (req, res) =>{
    res.send(category_info);
});

app.get("/json/product_info_comments", (req, res) =>{
    res.send(product_info_comments);
});

app.get("/json/product_info", (req, res) =>{
    res.send(product_info);
});

app.get("/json/products_url", (req, res) =>{
    res.send(products_url);
});

app.get("/json/publish_product", (req, res) =>{
    res.send(publish_product);
});

app.listen(port, () => {
    console.log("Escuchando a http://localhost:" + port)
});

app.post('/post', function(req, res){
    let newSaleString =
    `
    usuario: ${req.body.usuario}
    items: 
    `
    for (var i = 0; i < req.body.items.length; i++){
        const item = req.body.items[i];
        newSaleString += 
        `
        Nombre: ${item.nombre}
        Precio por unidad: ${item.costo} ${item.moneda}
        Cantidad: ${item.cantidad}
        Total: ${item.total} ${item.moneda}
        `
    }
    newSaleString +=
    `
    info pago:
    `
        const pago = req.body.pago[0];
        if (pago.tipo == "Tarjeta de crédito"){
            newSaleString += 
        `    Tipo de pago: Tarjeta de crédito
        Numero tarjeta: ${pago.numTarjeta}
        Titular tarjeta: ${pago.titularTarjeta}
        Codigo Seguridad: ${pago.segTarjeta}`
        } else if (pago.tipo == "Transferencia bancaria"){
            newSaleString += 
        `    Tipo de pago: Transferencia bancaria
        Numero cuenta: ${pago.cuenta}`
        } 

    newSaleString +=
    `
    subtotal: ${req.body.subtotal}
    costoEnvio: ${req.body.costoEnvio}
    tipoEnvio: ${req.body.tipoEnvio}
    totalConEnvio: ${req.body.totalConEnvio}
    calle: ${req.body.calle}
    numero: ${req.body.numero}
    esquina: ${req.body.esquina}
    pais: ${req.body.pais}
    `;

    fs.appendFile("new-sale.txt", newSaleString, function (err){
        if (err){
            console.log(err);
            res.send({
                msg: "Ha ocurrido un error: " + err
            });
        } else {
            console.log("Archivo guardado");
            res.send({
                msg: "El envío ha sido guardado con exito"
            });
        }
    })
})

/*app.post('/new-comment', function(req, res){
    let newCommentString =
    `score: ${req.body.score},
    description: ${req.body.description},
    user: ${req.body.user},
    dateTime: ${req.body.dateTime}
    `;

    fs.appendFile("new-comment.txt", newCommentString, function (err){
        if (err){
            console.log(err);
            res.send({
                mensaje: "Ha ocurrido un error: " + err
            });
        } else {
            console.log("Archivo guardado");
            res.send({
                mensaje: "El comentario ha sido guardado con exito"
            });
        }
    })
})*/
=======
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
>>>>>>> Stashed changes
