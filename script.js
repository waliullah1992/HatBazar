let cartCount = 0;

function addToCart(productName) {
    cartCount++;
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> কার্ট (${cartCount})`;
    alert(productName + ' কার্টে যোগ করা হয়েছে!');
}
