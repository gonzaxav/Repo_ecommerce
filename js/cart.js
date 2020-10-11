/*if (localStorage.getItem("User-Logged")) {

}*/

var cart_info_array = [];
var dont_display_array = [];
var displayIn = "UYU";

function calcTotal() {
    let subs = document.getElementsByClassName("subtotal");
    let suma = 0;
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerText = suma;

    var radios = document.getElementsByName("tipoEnvio");

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            suma *= parseFloat(radios[i].value, 10);
            break;
        }
    }
    document.getElementById("totalConEnvioID").innerText = displayIn + " " + suma;
}

function calcSubtotal(unitCost, i) {
    if (document.getElementById(`count${i}`) != null){
        let count = parseInt(document.getElementById(`count${i}`).value);
        subtotal = checkCurrency(unitCost, cart_info_array[i].currency) * count;
        document.getElementById(`productSubtotal${i}`).innerText = subtotal;
        calcTotal();
    }
}

function checkCurrency(unitCost, unitCurrency) {
    if (displayIn == "UYU"){
        if (unitCurrency === "USD") {
            return unitCost * 40;
        }
        else {
            return unitCost;
        }
    }
    else if (displayIn == "USD"){
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
    for (let i = 0; i < array.length; i++){
        if (dont_display_array.indexOf(i) == -1){
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
    if (display == false){
        document.getElementById("cartDivID").innerHTML =
            `
        <div class="text-center p-4">
            <h3>No hay productos en el carrito</h2>
            <p>Ver <a href="products.html">lista de productos</a></p>
        </div>
        `
    }

    /*if (array.length - dont_display_array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            let show = true;
            if (dont_display_array.length > 0) {
                for (let item in dont_display_array) {
                    if (item == i) {
                        show = false
                    }
                }
            }
            if (show == true) {
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
    }
    else {
        document.getElementById("cartDivID").innerHTML =
            `
        <div class="text-center p-4">
            <h3>No hay productos en el carrito</h2>
            <p>Ver <a href="products.html">lista de productos</a></p>
        </div>
        `
    }*/


    document.getElementById("cart").innerHTML = contenido;
    calcTotal();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart_info_array = resultObj.data.articles;

            ShowCartInfo(cart_info_array);
        }
    });
    document.getElementById("displayInUYU").addEventListener("click", function(e){
        if (displayIn != "UYU"){
            displayIn = "UYU";
            document.getElementById("totalID").innerText = "Total (UYU)";
            for (let i = 0; i < cart_info_array.length; i++) {
                calcSubtotal(cart_info_array[i].unitCost, i);
            }
        }
    })
    document.getElementById("displayInUSD").addEventListener("click", function(e){
        if (displayIn != "USD"){
            displayIn = "USD";
            document.getElementById("totalID").innerText = "Total (USD)";
            for (let i = 0; i < cart_info_array.length; i++) {
                calcSubtotal(cart_info_array[i].unitCost, i);
            }
        }
    })
});