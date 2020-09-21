
const ORDER_ASC_BY_PRICE = "pri->PRI";
const ORDER_DESC_BY_PRICE = "PRI->pri";
const ORDER_DESC_BY_RELEVANCE = "REL->rel";
//------------------------------------------
var productsArray = [];
var minPag = undefined;
var maxPag = undefined;
var buscar = undefined;
//------------------------------------------

function sortProducts(criteria, array) {
    let result = [];

    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProducts(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minPag == undefined) || (minPag != undefined && parseInt(product.cost) >= minPag)) &&
            ((maxPag == undefined) || (maxPag != undefined && parseInt(product.cost) <= maxPag))) {

            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {
                contenido += `
                    <a href="product-info.html" class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.imgSrc}" class="img-thumbnail" alt="Imagen">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">
                                        ${product.name}<br>
                                    </h4>
                                </div>
                                <p class="mb-1">
                                    ${product.description}<br><br>
                                    Precio:  <strong>${product.cost} ${product.currency}</strong><br>
                                    ${product.soldCount} vendidos<br>
                                </p>
                            </div>
                        </div>
                    </a>`;
            }
        }

        document.getElementById("productsDiv").innerHTML = contenido;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);
            showProducts(productsArray);
        }
    });

    //------------------------------------------------------------------
    document.getElementById("sortPreAsc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);
        showProducts(productsArray);
    });

    document.getElementById("sortPreDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_BY_PRICE, productsArray);
        showProducts(productsArray);
    });

    document.getElementById("sortReleDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_BY_RELEVANCE, productsArray);
        showProducts(productsArray);
    });
    //---------------------------------------------------------------------

    document.getElementById("filtrar").addEventListener("click", function () {
        minPag = document.getElementById("rango-min").value;
        maxPag = document.getElementById("rango-max").value;

        if ((minPag != undefined) && (minPag != "") && (parseInt(minPag)) >= 0) {
            minPag = parseInt(minPag);
        }
        else {
            minPag = undefined;
        }
        if ((maxPag != undefined) && (maxPag != "") && (parseInt(maxPag)) >= 0) {
            maxPag = parseInt(maxPag);
        }
        else {
            maxPag = undefined;
        }

        showProducts(productsArray);
    });

    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("rango-min").value = "";
        document.getElementById("rango-max").value = "";

        minPag = undefined;
        maxPag = undefined;

        showProducts(productsArray);
    });

    document.getElementById("buscador").addEventListener('input', function () {
        buscar = document.getElementById("buscador").value.toLowerCase();

        showProducts(productsArray);
    });

    document.getElementById("limpBusc").addEventListener("click", function () {
        document.getElementById("buscador").value = "";

        buscar = undefined;

        showProducts(productsArray);
    });
});