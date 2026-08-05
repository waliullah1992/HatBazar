// HatBazar Script

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

// কার্টে পণ্য যোগ করুন
function addToCart(productName) {
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(productName + " কার্টে যোগ করা হয়েছে!");
}

// কার্ট সংখ্যা আপডেট
function updateCartCount() {
    const cartButton = document.querySelector(".cart-btn");

    if (cartButton) {
        cartButton.innerHTML =
            '<i class="fas fa-shopping-cart"></i> কার্ট (' + cart.length + ')';
    }
}

// সার্চ
function searchProduct() {
    const input = document.querySelector('input[type="text"]');

    if (!input) return;

    const keyword = input.value.trim().toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();

        if (name.includes(keyword)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
