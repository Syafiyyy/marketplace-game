document.addEventListener('DOMContentLoaded', () => {
    const subtotalElement = document.querySelector('.amount.subtotal');
    const discountElement = document.querySelector('.amount.discount');
    const totalElement = document.querySelector('.amount.total');
    const receiptSection = document.getElementById('receiptSection');
    const receiptDetails = document.getElementById('receiptDetails');
    const paymentForm = document.getElementById('paymentForm');
    const cartBadge = document.getElementById("cartBadge");

    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Calculate subtotal
    let subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate discount (e.g., 20%)
    const discountRate = 0.2;
    const discount = subtotal * discountRate;

    // Calculate total without tax
    const total = subtotal - discount;

    // Update values on the checkout page
    subtotalElement.textContent = `RM ${subtotal.toFixed(2)}`;
    discountElement.textContent = `RM ${discount.toFixed(2)}`;
    totalElement.textContent = `RM ${total.toFixed(2)}`;

    // Function to reset the cart
    function resetCart() {
        // Clear the cart items from local storage
        localStorage.removeItem('cartItems');
        // Update the cart badge to 0
        if (cartBadge) {
            cartBadge.textContent = "0";
        }
    }

    // Function to store purchased items in library
    function storeInLibrary(items) {
        // Store the items in localStorage under 'purchasedItems'
        const existingLibraryItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
        const updatedLibraryItems = existingLibraryItems.concat(items);
        localStorage.setItem('purchasedItems', JSON.stringify(updatedLibraryItems));
    }

    // Handle form submission for payment
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Get selected payment method
        const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').id;

        // Generate receipt details
        receiptDetails.innerHTML = `
            <p><strong>Total Amount Paid:</strong> RM ${total.toFixed(2)}</p>
            <p><strong>Discount Applied:</strong> RM ${discount.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> ${selectedPaymentMethod}</p>
        `;

        // Store purchased items in library
        storeInLibrary(cartItems);

        // Reset the cart after purchase
        resetCart();

        // Show the receipt section and hide the checkout form
        receiptSection.style.display = 'block';
        document.querySelector('.checkout-section').style.display = 'none';
    });
});
