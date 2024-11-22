document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartContainer');
    const resetLibraryButton = document.getElementById('resetLibraryButton');  // Reset button
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

    // Function to render library items
    function renderLibrary() {
        cartContainer.innerHTML = ''; // Clear the container before rendering

        if (purchasedItems.length === 0) {
            cartContainer.innerHTML = `<p>No items found in your library.</p>`;
        } else {
            purchasedItems.forEach(item => {
                // Create a div for each item
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                
                // Add item details to the div, including the image
                itemDiv.innerHTML = `
                    <div class="item-details">
                        <img src="${item.image}" alt="${item.name}" class="item-image" />  <!-- Display the image -->
                        <h3>${item.name}</h3>
                    </div>
                `;
                
                // Append the item to the container
                cartContainer.appendChild(itemDiv);
            });
        }
    }

    // Function to reset the library
    function resetLibrary() {
        // Clear the purchased items from localStorage
        localStorage.removeItem('purchasedItems');

        // Re-render the library to reflect the reset
        renderLibrary();

    }

    // Event listener for reset button
    if (resetLibraryButton) {
        resetLibraryButton.addEventListener('click', () => {
            // Reset library immediately
            resetLibrary();

            // Also make sure to clear the items from the localStorage immediately after clicking
            localStorage.setItem('purchasedItems', JSON.stringify([]));  // Explicitly store empty array
        });
    }

    // Render the library when the page is loaded
    renderLibrary();

    // Handle Download button functionality
    const downloadButton = document.getElementById('DownloadButton');
    downloadButton.addEventListener('click', () => {
        // Get the selected checkboxes
        const checkboxes = document.querySelectorAll('.download-checkbox:checked');
        
        if (checkboxes.length === 0) {
            alert('Please select at least one item to download.');
        } else {
            // Get the selected items based on the checkbox index
            const selectedItems = [];
            checkboxes.forEach(checkbox => {
                const index = checkbox.getAttribute('data-index');
                selectedItems.push(purchasedItems[index]);
            });

            // Here you could implement further logic to handle the download,
            // such as generating a download file or exporting data.
            // For now, just alert the selected items.
            alert('Downloading selected items...');
            console.log('Selected items to download:', selectedItems);
        }
    });

    // Function to get selected items (based on checkboxes)
    function getSelectedItems() {
        const selectedItems = [];
        const checkboxes = document.querySelectorAll('.item-checkbox:checked');
        
        checkboxes.forEach(checkbox => {
            const index = checkbox.getAttribute('data-index');
            selectedItems.push(cartItems[index]);  // Push the selected item to the array
        });

        return selectedItems;
    }

    // Event listener for the checkout button for each item
    checkoutContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('checkout-item-btn')) {
            const itemIndex = e.target.getAttribute('data-index');
            const item = cartItems[itemIndex];

            // Handle checkout for this item
            alert(`Proceeding with the purchase for: ${item.name}`);
            console.log(item); // Display the selected item details for debugging
        }
    });

    // Initial render of the library when the page is loaded
    renderLibrary();
});
