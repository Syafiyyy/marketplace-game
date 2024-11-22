// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartContainer');
    const totalContainer = document.querySelector('.total-amount');
    const resetCartBtn = document.getElementById('resetCartBtn');
    const checkoutButton = document.getElementById('checkoutButton');
    const continueShoppingButton = document.getElementById('continueShoppingButton');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalAmount = 0;

    // Function to update the cart badge count
    function updateBadgeCount() {
        const cartBadge = document.getElementById("cartBadge");
        cartBadge.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    // Redirect to checkout.html when the "Proceed to Checkout" button is clicked
    checkoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // Function to render the cart items
    function renderCart() {
        cartContainer.innerHTML = '';
        totalAmount = 0;

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty. Start shopping!</p>';
        } else {
            cartItems.forEach((item, index) => {
                totalAmount += item.price * item.quantity;

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>RM ${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="increase-quantity" data-index="${index}">+</button>
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(itemDiv);
            });
        }

        totalContainer.textContent = `RM ${totalAmount.toFixed(2)}`;

        // Update the cart badge count
        updateBadgeCount();

        // Debugging statement to check cart items
        console.log("Rendering cart with items:", cartItems);
    }

    // Event listener for cart actions (increase, decrease, remove)
    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-quantity')) {
            const index = e.target.dataset.index;
            cartItems[index].quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        } else if (e.target.classList.contains('decrease-quantity')) {
            const index = e.target.dataset.index;
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
            } else {
                cartItems.splice(index, 1); // Remove the item if quantity reaches zero
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        } else if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }
    });

    // Function to reset the cart
    function resetCart() {
        // Clear the cart items from local storage
        localStorage.removeItem('cartItems');
        
        // Reset cartItems array
        cartItems = [];

        // Re-render the cart with empty state
        renderCart();
    }

    // Event listener for reset cart button
    resetCartBtn.addEventListener('click', resetCart);

    // Initial render of the cart
    renderCart();

    // Event listener for Continue Shopping button (optional functionality)
    continueShoppingButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });


    
});
