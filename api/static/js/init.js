const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_INFO_URL_2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

const PRICES_URL = "https://raw.githubusercontent.com/gonzaxav/xirans_webpage/main/prices.json";

const POST_NEW_COMMENT = "/new-comment";
const GET_ALL = "/get_all";
const GET_1 = "/get_1";
const POST = "/post";
const PUT = "/put";
const DELETE = "/delete";

/*const CATEGORIES_URL = "http://localhost:3000/json/categories_url";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/json/publish_product";
const CATEGORY_INFO_URL = "http://localhost:3000/json/category_info";
const PRODUCTS_URL = "http://localhost:3000/json/products_url";
const PRODUCT_INFO_URL = "http://localhost:3000/json/product_info";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/json/product_info_comments";
const CART_INFO_URL = "http://localhost:3000/json/cart_info";
const CART_BUY_URL = "http://localhost:3000/json/cart_buy";
const CART_INFO_URL_2 = "http://localhost:3000/json/cart_info2";*/

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

var postJSONData = function (url, obj) {
  var result = {};
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let userLogged = localStorage.getItem('User-Logged');
  let user = document.getElementById("user");
  let logout = document.getElementById("logout");

  if (userLogged && user){
    userLogged = JSON.parse(userLogged);
    user.innerText = '' + userLogged.email;
  }
  if (logout){
    logout.addEventListener("click", function(e){
      localStorage.removeItem('User-Logged');
    });
  }
});