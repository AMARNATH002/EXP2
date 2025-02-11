document.addEventListener("DOMContentLoaded", function () {
    let addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));
            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            
            let existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ name: name, price: price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            alert(`${name} added to cart!`);
        });
    });
});
