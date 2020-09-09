var product = "";
var commentsArray = [];
var selectedImg;

function showProduct(array, arrayComments) {

    let product = array;
    let info = "";
    let imgs = "";
    let comments = "";
    let score = "";

    info += `<h2>${product.name}</h2>
            <hr>
            <text>${product.description}</text><br><br>
            Precio: <strong>${product.cost} ${product.currency}</strong><br>
            Vendidos: <strong>${product.soldCount}</strong><br>
            Categoria: <strong>${product.category}</strong><br>`;

    imgs += `<div class="row">
                <div class="col-2 text-center" style="width:100px;">
                    <img class="img img-thumbnail" id="img01" src="${product.images[0]}" width="100px" alt=""><br>
                    <img class="img img-thumbnail" id="img02" src="${product.images[1]}" width="100px" alt=""><br>
                    <img class="img img-thumbnail" id="img03" src="${product.images[2]}" width="100px" alt=""><br>
                    <img class="img img-thumbnail" id="img04" src="${product.images[3]}" width="100px" alt=""><br>
                    <img class="img img-thumbnail" id="img05" src="${product.images[4]}" width="100px" alt=""><br>
                </div>
                <div class="col-10 text-center" style="width:500px;">
                    <img class="img img-thumbnail" id="img06" src="${product.images[0]}" width="500px" alt=""><br>
                </div>
            </div>`;

    for (let comment in arrayComments) {
        let maxEstrellas = 5;
        let puntos = "";

        for (let i = 1; i <= maxEstrellas; i++) {
            if (i <= arrayComments[comment].score) {
                puntos += '<span class="fa fa-star checked"></span>';
            }
            else {
                puntos += '<span class="fa fa-star"></span>';
            }
        }
        comments += `<div style="text-align: left;">${puntos}</div>
                    <strong>${arrayComments[comment].user}</strong> dice:<br>
                    <p>${arrayComments[comment].description}</p><br>`;
    }

    document.getElementById("contenido").innerHTML += info;
    document.getElementById("imagenes").innerHTML += imgs;
    document.getElementById("comentarios").innerHTML += comments;

    document.getElementById("img01").addEventListener("mouseenter", function (e) {
        document.getElementById("img06").src = this.src;
    });
    document.getElementById("img02").addEventListener("mouseenter", function (e) {
        document.getElementById("img06").src = this.src;
    });
    document.getElementById("img03").addEventListener("mouseenter", function (e) {
        document.getElementById("img06").src = this.src;
    });
    document.getElementById("img04").addEventListener("mouseenter", function (e) {
        document.getElementById("img06").src = this.src;
    });
    document.getElementById("img05").addEventListener("mouseenter", function (e) {
        document.getElementById("img06").src = this.src;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;

            showProduct(product, commentsArray);
        }
    })
});