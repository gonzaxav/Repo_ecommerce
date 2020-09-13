var product = "";
var commentsArray = [];
var selectedImg;

function showProduct(array, arrayComments) {

    let product = array;
    let info = "";
    let imgs = "";
    let comments = "";

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

    let productScore = 0;

    for (let comment in arrayComments) {
        productScore += parseFloat(arrayComments[comment].score);
    }
    productScore = ((productScore / arrayComments.length * 10) / 10).toFixed(1);
    let maxEstrellas = 5;
    let puntos = "";

    let productScoreRoundedTo05 = Math.round(productScore * 2) / 2;

    for (let i = 1; i <= maxEstrellas; i++) {
        if (i <= productScoreRoundedTo05) {
            puntos += '<span class="fa fa-star checked"></span>';
        }
        else if (productScoreRoundedTo05 - i == -0.5) {
            puntos += '<span class="fa fa-star-half-alt"></span>';
        }
        else {
            puntos += '<span class="fa fa-star"></span>';
        }
    }

    comments += `<div class="productAverageScore">
                    <h3>Opiniones sobre el producto</h3>
                    <div class="scoreStarAndPromedio">
                        <span class="productScore">${productScore}</span>
                        <span class="starAndPromedio">
                            <span class="productScoreStars">${puntos}</span>
                            <div>
                                <span>Promedio entre</span>
                                <span>${arrayComments.length}</span>
                                <span>opiniones</span>
                            </div>
                        </span>
                    </div>
                </div>
                <br>
                `;

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
                    <p>${arrayComments[comment].description}</p>
                    <small>${arrayComments[comment].dateTime}</small><br><br>`;
    }

    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;

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
    document.getElementById("enviarNuevoComentario").addEventListener("click", function (e) {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}
                        ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let newComment = {
            score: getRating(),
            description: document.getElementById('nuevoComentarioTextoID').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: dateTime
        };

        commentsArray.push(newComment);

        showProduct(product, commentsArray);
    })
});

function getRating() {
    var labels = document.getElementsByName('rating');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].checked) {
            return parseInt(labels[i].value);
        }
    }
}