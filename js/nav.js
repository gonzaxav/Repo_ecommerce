document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("navID").innerHTML =
    `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="start.html">Inicio</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav w-100">
                    <li class="nav-item col active d-flex align-items-center justify-content-center">
                        <a class="nav-link" href="categories.html">Categorías</a>
                    </li>
                    <li class="nav-item col active d-flex align-items-center justify-content-center">
                        <a class="nav-link" href="products.html">Productos</a>
                    </li>
                    <li class="nav-item col active d-flex align-items-center justify-content-center">
                        <a class="nav-link" href="sell.html">Vender</a>
                    </li>
                    <li class="nav-item col active dropdown d-flex align-items-center justify-content-center">
                        <a class="nav-link dropdown-toggle" href="#" id="user" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                    </a>
                    <div class="dropdown-menu" aria-labelledby="user">
                        <a class="dropdown-item" href="cart.html">Mi carrito</a>
                        <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="index.html" id="logout">Cerrar sesión</a>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
  </nav>
    `
});