var cartItems = [];

function getProducts() {
    $.get("https://fakestoreapi.com/products", function(products) {
        displayProducts(products);
    });
}

function displayProducts(products) {
    var productList = $("#product-list");
    productList.empty();

    $.each(products, function(index, product) {
        var item = $("<div>").addClass("product");

        var image = $("<img>").attr("src", product.image);
        item.append(image);

        var title = $("<h2>").text(product.title);
        item.append(title);

        var price = $("<p>").text("Preço: $" + product.price);
        item.append(price);

        var rating = $("<span>").addClass("rating").text(product.rating);
        item.append($("<p>").append("Avaliação: ").append(rating));

        var addToCartButton = $("<button>").text("Adicionar ao Carrinho").attr("data-id", product.id);
        item.append(addToCartButton);

        var detailsButton = $("<button>").text("Detalhes").attr("data-id", product.id).addClass("details-button");
        item.append(detailsButton);

        productList.append(item);
    });
}

function updateCartView() {
    var cartItemsList = $("#cart-items");
    cartItemsList.empty();

    $.each(cartItems, function(index, item) {
        var listItem = $("<li>").text(item.title + " - $" + item.price);
        listItem.append(
            $("<button>").text("Remover").attr("data-id", item.id).addClass("remove-item")
        );
        cartItemsList.append(listItem);
    });
}

function addToCart(productId) {
    $.get("https://fakestoreapi.com/products/" + productId, function(product) {
        cartItems.push(product);
        updateCartView();
    });
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(function(item) {
        return item.id != productId;
    });
    updateCartView();
}

function clearCart() {
    cartItems = [];
    updateCartView();
}

$(document).on("click", ".product button", function() {
    var productId = $(this).attr("data-id");
    addToCart(productId);
});

$(document).on("click", ".details-button", function() {
    var productId = $(this).attr("data-id");
    var product = cartItems.find(function(item) {
        return item.id == productId;
    });
    if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product_details.html";
    }
});

$(document).on("click", ".remove-item", function() {
    var productId = $(this).attr("data-id");
    removeFromCart(productId);
});

$("#clear-cart").click(function() {
    clearCart();
});

$("#checkout").click(function() {
    // Lógica para finalizar a compra aqui
    alert("Compra finalizada! Obrigado por comprar conosco!");
    clearCart();
});

function searchProducts(searchText) {
    $.get("https://fakestoreapi.com/products?title=" + searchText, function(products) {
        displayProducts(products);
    });
}

$("#search-form").submit(function(event) {
    event.preventDefault();
    var searchText = $("#search-input").val();
    searchProducts(searchText);
});

$("#search-input").keyup(function() {
    var searchText = $(this).val();
    searchProducts(searchText);
});

getProducts();
