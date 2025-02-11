document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalSpan = document.getElementById("subtotal");
    const taxSpan = document.getElementById("tax");
    const totalSpan = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="cart-quantity form-control"></td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}">X</button></td>
            `;
            cartItemsContainer.appendChild(row);
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        subtotalSpan.textContent = `₹${subtotal.toFixed(2)}`;
        taxSpan.textContent = `₹${tax.toFixed(2)}`;
        totalSpan.textContent = `₹${total.toFixed(2)}`;

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartTotal", total.toFixed(2)); // Save total for checkout page
    }

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));

            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
            updateCartDisplay();
        });
    });

    // Update quantity
    cartItemsContainer.addEventListener("input", function (e) {
        if (e.target.classList.contains("cart-quantity")) {
            const index = e.target.dataset.index;
            cart[index].quantity = parseInt(e.target.value);
            updateCartDisplay();
        }
    });

    // Remove item
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    updateCartDisplay();
});
