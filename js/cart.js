var cart_info_array = [];
var dont_display_array = [];
var displayIn = "UYU";
var successMessage = "";

function calcTotal() {
    let subs = document.getElementsByClassName("subtotal");
    let suma = 0;
    let envio = 0;
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }

    var radios = document.getElementsByName("tipoEnvio");

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            envio = suma * parseFloat(radios[i].value, 10);
            break;
        }
    }
    document.getElementById("subtotalID").innerText = "$ " + suma;
    document.getElementById("envioID").innerText = "$ " + envio;
    document.getElementById("totalConEnvioID").innerText = "$ " + (suma + envio);
    document.getElementById("totalConEnvioTextoID").innerText = "Total (" + displayIn + ") ";
}

function calcSubtotal(unitCost, i) {
    if (document.getElementById(`count${i}`) != null) {
        let count = parseInt(document.getElementById(`count${i}`).value);
        subtotal = checkCurrency(unitCost, cart_info_array[i].currency) * count;
        document.getElementById(`productSubtotal${i}`).innerText = subtotal;
        calcTotal();
    }
}

function checkCurrency(unitCost, unitCurrency) {
    if (displayIn == "UYU") {
        if (unitCurrency === "USD") {
            return unitCost * 40;
        }
        else {
            return unitCost;
        }
    }
    else if (displayIn == "USD") {
        if (unitCurrency === "UYU") {
            return unitCost / 40;
        }
        else {
            return unitCost;
        }
    }
}

function addToDontDisplayList(i) {
    dont_display_array.push(i);
    ShowCartInfo(cart_info_array);
}

function ShowCartInfo(array) {
    let contenido = "";

    let display = false;
    for (let i = 0; i < array.length; i++) {
        if (dont_display_array.indexOf(i) == -1) {
            display = true;

            let product = array[i];

            let sub = checkCurrency(product.unitCost, product.currency) * product.count;

            contenido +=
                `
            <tr>
                <th>${i + 1}</th>

                <td><img src='${product.src}' width="50px"></td>

                <td>${product.name}</td>

                <td>${product.unitCost} ${product.currency}</td>

                <td><input class="form-control" style="width:70px;" onchange="calcSubtotal(${product.unitCost}, ${i})"
                    type="number" id="count${i}" value="${product.count}" min="1"></td>

                <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:bold;">${sub}</span></td>

                <td><button type="button" class="btn btn-danger" onclick="addToDontDisplayList(${i})"><i class="fas fa-trash"></i></button></td>
            </tr>
            `;
        }
    }
    if (display == false) {
        document.getElementById("cartDivID").innerHTML =
            `
        <div class="text-center p-4">
            <h3>No hay productos en el carrito</h2>
            <p>Ver <a href="products.html">lista de productos</a></p>
        </div>
        `
    }

    document.getElementById("cart").innerHTML = contenido;
    calcTotal();
}

function fillPayment() {
    let pagos = document.getElementsByName("paymentType");
    for (let i = 0; i < pagos.length; i++) {
        if (pagos[i].checked && (pagos[i].value) == "1") {
            document.getElementById("modalDisplayCCard").classList.remove("d-none");
            document.getElementById("modalDisplayBank").classList.add("d-none");
        } else if (pagos[i].checked && (pagos[i].value) == "2") {
            document.getElementById("modalDisplayCCard").classList.add("d-none");
            document.getElementById("modalDisplayBank").classList.remove("d-none");
        }
    }
}

function validatePayment() {
    let numTarjeta = document.getElementById("numTarjeta").value;
    let titularTarjeta = document.getElementById("titularTarjeta").value;
    let segTarjeta = document.getElementById("segTarjeta").value;
    let cuenta = document.getElementById("cuenta").value;
    let formaPago = document.getElementsByName("paymentType");
    let pagoValidado = false;

    for (let i = 0; i < formaPago.length; i++) {
        if (formaPago[i].checked && formaPago[i].value == "1") {
            if (numTarjeta == "" || titularTarjeta == "" || segTarjeta == "") {
                pagoValidado = false;
            } else {
                pagoValidado = true;
            }
        } else if (formaPago[i].checked && formaPago[i].value == "2") {
            if (cuenta == "") {
                pagoValidado = false;
            } else {
                pagoValidado = true;
            }
        }
    }
    return pagoValidado;
}

function ok(){
    window.location = 'start.html';
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart_info_array = resultObj.data.articles;

            ShowCartInfo(cart_info_array);
        }
    });
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            successMessage = resultObj.data.msg;
        }
    });
    document.getElementById("displayInUYU").addEventListener("click", function (e) {
        if (displayIn != "UYU") {
            displayIn = "UYU";
            document.getElementById("totalID").innerText = "Total (UYU)";
            for (let i = 0; i < cart_info_array.length; i++) {
                calcSubtotal(cart_info_array[i].unitCost, i);
            }
        }
    })
    document.getElementById("displayInUSD").addEventListener("click", function (e) {
        if (displayIn != "USD") {
            displayIn = "USD";
            document.getElementById("totalID").innerText = "Total (USD)";
            for (let i = 0; i < cart_info_array.length; i++) {
                calcSubtotal(cart_info_array[i].unitCost, i);
            }
        }
    })
    let form = document.getElementById("needs-validation");
    form.addEventListener("submit", function (e) {
        /*form is missing something*/
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            /*stuff to do when something is missing on the form*/
            form.classList.add("was-validated");
            /*stuff to do when modal is not missing anything*/
            if (validatePayment()) {
                let btnPago = document.getElementById("btnPago");
                btnPago.classList.remove("btn-primary");
                btnPago.classList.remove("btn-danger");
                btnPago.classList.add("btn-success");
                document.getElementById("pagar").innerHTML =
                    `
                <div class="alert alert-success alert-dismissible alertFix show mt-3" role="alert">
                    <strong>Forma de pago ingresada</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
            /*stuff to do when modal is missing something*/
            else {
                let btnPago = document.getElementById("btnPago");
                btnPago.classList.remove("btn-primary");
                btnPago.classList.remove("btn-success");
                btnPago.classList.add("btn-danger");
                document.getElementById("pagar").innerHTML =
                    `
                <div class="alert alert-danger alert-dismissible alertFix show mt-3" role="alert">
                    <strong>Debe ingresar una forma de pago!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
        }
        /*form is not missing anything*/
        else {
            /*stuff to do when modal is missing something*/
            if (!validatePayment()) {
                e.preventDefault();
                e.stopPropagation();

                let btnPago = document.getElementById("btnPago");
                btnPago.classList.remove("btn-primary");
                btnPago.classList.remove("btn-success");
                btnPago.classList.add("btn-danger");
                document.getElementById("pagar").innerHTML =
                    `
                <div class="alert alert-danger alert-dismissible alertFix show mt-3" role="alert">
                    <strong>Debe ingresar una forma de pago!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            } /*all info is filled*/
            else {
                if (validatePayment()) {
                    document.getElementById("carrito").innerHTML =
                        `
                    <div class="alert alert-success alert-dismissible show mt-3" role="alert">
                        <strong>Felicidades!</strong>
                        <p>
                            ${successMessage}
                        </p>
                        <button type="button" class="close" onclick="ok()" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `
                }
            }
        }
    })
});