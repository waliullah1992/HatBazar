// HatBazar E-commerce Script

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productPrices = {
    "প্রিমিয়াম স্মার্ট ওয়াচ": 850,
    "স্টাইলিশ ঘড়ি": 750,
    "ফ্যাশনেবল চশমা": 850,
    "হাতের নকশীকাঁথা": 1200,
    "ডিজিটাল ঘড়ি": 600
};

// Cart count update
function updateCartCount() {
    const cartButton = document.querySelector(".cart-btn");

    if (cartButton) {
        cartButton.innerHTML =
            '<i class="fas fa-shopping-cart"></i> কার্ট (' +
            cart.length +
            ')';
    }
}

// Add product to cart
function addToCart(productName) {
    cart.push(productName);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(productName + " - কার্টে যোগ করা হয়েছে!");
}

// Calculate total
function getCartTotal() {
    let total = 0;

    cart.forEach(function(product) {
        total += productPrices[product] || 0;
    });

    return total;
}

// Show checkout
function showCheckout() {

    if (cart.length === 0) {
        alert("আপনার কার্ট খালি। আগে একটি পণ্য নির্বাচন করুন।");
        return;
    }

    let productList = "";

    cart.forEach(function(product, index) {
        productList +=
            (index + 1) +
            ". " +
            product +
            " - ৳" +
            (productPrices[product] || 0) +
            "<br>";
    });

    const total = getCartTotal();

    const checkout = document.createElement("div");

    checkout.id = "checkoutBox";

    checkout.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.65);
        z-index:9999;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:15px;
        box-sizing:border-box;
    `;

    checkout.innerHTML = `
        <div style="
            background:white;
            width:100%;
            max-width:450px;
            max-height:90vh;
            overflow:auto;
            border-radius:15px;
            padding:20px;
            box-sizing:border-box;
        ">

            <h2 style="text-align:center;color:#009879;">
                🛒 অর্ডার সম্পন্ন করুন
            </h2>

            <div style="
                background:#f5f5f5;
                padding:12px;
                border-radius:10px;
                margin-bottom:15px;
            ">
                <b>আপনার পণ্য:</b><br><br>
                ${productList}
                <hr>
                <b>মোট পণ্যের মূল্য: ৳${total}</b>
            </div>

            <label>👤 আপনার নাম</label>

            <input id="customerName"
                type="text"
                placeholder="আপনার নাম লিখুন"
                style="
                    width:100%;
                    padding:12px;
                    margin:7px 0 12px;
                    box-sizing:border-box;
                    border:1px solid #ccc;
                    border-radius:8px;
                ">

            <label>📱 মোবাইল নম্বর</label>

            <input id="customerPhone"
                type="tel"
                placeholder="01XXXXXXXXX"
                style="
                    width:100%;
                    padding:12px;
                    margin:7px 0 12px;
                    box-sizing:border-box;
                    border:1px solid #ccc;
                    border-radius:8px;
                ">

            <label>🏠 সম্পূর্ণ ঠিকানা</label>

            <textarea id="customerAddress"
                placeholder="গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা"
                style="
                    width:100%;
                    height:80px;
                    padding:12px;
                    margin:7px 0 12px;
                    box-sizing:border-box;
                    border:1px solid #ccc;
                    border-radius:8px;
                "></textarea>

            <label>💳 পেমেন্ট পদ্ধতি</label>

            <select id="paymentMethod"
                style="
                    width:100%;
                    padding:12px;
                    margin:7px 0 15px;
                    border:1px solid #ccc;
                    border-radius:8px;
                ">

                <option value="Cash on Delivery">
                    Cash on Delivery
                </option>

            </select>

            <button onclick="placeOrder()"
                style="
                    width:100%;
                    padding:14px;
                    background:#25D366;
                    color:white;
                    border:none;
                    border-radius:8px;
                    font-size:16px;
                    font-weight:bold;
                ">
                📱 WhatsApp-এ অর্ডার করুন
            </button>

            <button onclick="closeCheckout()"
                style="
                    width:100%;
                    padding:12px;
                    margin-top:8px;
                    background:#555;
                    color:white;
                    border:none;
                    border-radius:8px;
                ">
                বন্ধ করুন
            </button>

        </div>
    `;

    document.body.appendChild(checkout);
}

// Place order through WhatsApp
function placeOrder() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!name) {
        alert("আপনার নাম লিখুন।");
        return;
    }

    if (!phone) {
        alert("আপনার মোবাইল নম্বর লিখুন।");
        return;
    }

    if (!address) {
        alert("আপনার সম্পূর্ণ ঠিকানা লিখুন।");
        return;
    }

    let orderText =
        "🛍️ *HatBazar নতুন অর্ডার*%0A%0A";

    orderText +=
        "👤 নাম: " + encodeURIComponent(name) + "%0A";

    orderText +=
        "📱 মোবাইল: " + encodeURIComponent(phone) + "%0A";

    orderText +=
        "🏠 ঠিকানা: " + encodeURIComponent(address) + "%0A%0A";

    orderText += "📦 পণ্য:%0A";

    cart.forEach(function(product, index) {

        orderText +=
            (index + 1) +
            ". " +
            encodeURIComponent(product) +
            " - ৳" +
            (productPrices[product] || 0) +
            "%0A";
    });

    orderText +=
        "%0A💰 মোট মূল্য: ৳" +
        getCartTotal();

    orderText +=
        "%0A💳 পেমেন্ট: " +
        encodeURIComponent(payment);

    const whatsappNumber = "8801947819432";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        orderText;

    window.open(whatsappURL, "_blank");

    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    closeCheckout();
}

// Close checkout
function closeCheckout() {

    const checkout = document.getElementById("checkoutBox");

    if (checkout) {
        checkout.remove();
    }
}

// Cart button click
document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

    const cartButton = document.querySelector(".cart-btn");

    if (cartButton) {
        cartButton.addEventListener("click", showCheckout);
    }

});

// Product search
function searchProduct() {

    const input = document.querySelector('input[type="text"]');

    if (!input) return;

    const keyword = input.value.trim().toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const name =
            product.querySelector("h3").textContent.toLowerCase();

        if (name.includes(keyword)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}
