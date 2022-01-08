var cartItemsRemoveButton = document.querySelectorAll(".danger-btn");
for (var i = 0; i < cartItemsRemoveButton.length; i++) {
    var removeButton = cartItemsRemoveButton[i];
    removeButton.addEventListener("click", removeCartItems);

}

var quantityInput = document.querySelectorAll(".cart-quantity-input");
for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
}

var addToCartButton = document.querySelectorAll(".shop-item-button");
for (var i = 0; i < addToCartButton.length; i++) {
    var cartButton = addToCartButton[i];
    cartButton.addEventListener("click", getItemToAdd);
}

var purchaseButton = document.querySelector(".purchase-btn");
purchaseButton.addEventListener("click", itemPurchase);

function itemPurchase() {
    alert("Thank you for your purchase")
    var cartItems = document.querySelector(".cart-items");
    if (cartItems.hasChildNodes()) {
        cartItems.remove(cartItems.firstChild)
    }
    updateCartTotal();
}

function getItemToAdd(event) {
    var cartButton = event.target;
    var shopItem = cartButton.parentElement.parentElement;
    var title = shopItem.querySelector(".shop-item-title").innerText;
    var price = shopItem.querySelector(".shop-item-price").innerText;
    var imageSource = shopItem.querySelector(".shop-item-img").src;
    addItemToCart(title, price, imageSource);
    updateCartTotal();
}

function addItemToCart(title, price, imageSource) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row")
    var cartItems = document.querySelector(".cart-items");
    var cartItemTitle = document.querySelectorAll(".cart-item-title");
    for (var i = 0; i < cartItemTitle.length; i++) {
        if (cartItemTitle[i].innerText == title) {
            alert("Item already added to Cart");
            return;
        }
    }
    var rawHtmlContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-img" src="${imageSource}" width="100px" height="100px">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-item-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn primary-btn danger-btn">REMOVE</button>
        </div>`
    cartRow.innerHTML = rawHtmlContents;
    cartItems.append(cartRow);


    cartRow.querySelector(".danger-btn").addEventListener("click", removeCartItems);
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
}

function removeCartItems(event) {
    var button = event.target;
    button.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemsContainer = document.querySelector(".cart-items");
    var cartRows = cartItemsContainer.querySelectorAll(".cart-row");
    var totalPrice = 0;


    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.querySelectorAll(".cart-item-price");
        var price = parseFloat(priceElement[0].innerText.replace("$", ""));
        var quantity = cartRow.querySelectorAll(".cart-quantity-input");

        totalPrice = totalPrice + (price * quantity[0].value);

        var total = document.querySelector(".cart-total-price");
        total.innerText = "$" + totalPrice.toFixed(2);
    }
}