// index.js

window.addEventListener("DOMContentLoaded", () => {
    const cartBadge = document.getElementById("cartBadge");

    // Function to animate the cart badge
    function animateCartBadge() {
        cartBadge.classList.add('badge-animate');
        setTimeout(() => {
            cartBadge.classList.remove('badge-animate');
        }, 300);
    }

    // Function to update the cart badge count
    function updateCartBadge() {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartBadge.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        animateCartBadge();
    }

    // Function to add item to the cart
    function addToCart(productElement) {
        const productName = productElement.querySelector(".heading-three").textContent;
        const productPriceText = productElement.querySelector(".show-price").textContent;

        // Set price to 0 if the product is free, otherwise parse the actual price
        const productPrice = productPriceText.trim().toUpperCase() === "FREE" ? 0 : parseFloat(productPriceText.replace("RM ", ""));
        const productImage = productElement.closest(".col").querySelector("img").src;

        // Get cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            // If already in the cart, increase the quantity
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // If not in the cart, add a new item
            cartItems.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        // Save updated cart items to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Update the cart badge count
        updateCartBadge();

        // Debugging log to check cart items in local storage
        console.log("Cart items in localStorage:", JSON.parse(localStorage.getItem("cartItems")));
    }

    // Initial badge update on page load
    updateCartBadge();

    // Function to reset the cart
    function resetCart() {
        // Clear the cart items from local storage
        localStorage.removeItem("cartItems");

        // Reset the cart badge to 0
        cartBadge.textContent = 0;

        alert("The cart has been reset.");
    }

    // Filter Logic
    function filterItems(category) {
        const items = document.querySelectorAll(".collection-item");

        items.forEach(item => {
            if (category === "all" || item.getAttribute("data-item") === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    // Event listeners for filter buttons
    document.querySelectorAll(".btn-col").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-btn");
            filterItems(category);
        });
    });

    // Add click event listener to each "Add to Cart" button
    document.querySelectorAll(".show-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent any default button action

            const productElement = e.target.closest(".col"); // Ensure we're getting the right element
            addToCart(productElement);
        });
    });

    // Initial display to show all items on page load
    filterItems("all");

    // Add event listener for reset cart button if it exists
    const resetButton = document.getElementById("resetCartButton");
    if (resetButton) {
        resetButton.addEventListener("click", resetCart);
    }

    document.querySelectorAll('.collection-item').forEach(item => {
        item.setAttribute('data-aos', 'zoom-in-up');
    });

    const email = document.getElementById("emailInput").value;

    // Add click event listener for each game image to go to respective checkout page
    document.querySelector('img[src="/static/photo/fc24.jpg"]').addEventListener("click", () => {
        window.location.href = "fc25.html";
    });

    document.querySelector('img[src="/static/photo/wukong.jpg"]').addEventListener("click", () => {
        window.location.href = "wukong.html";
    });

    document.querySelector('img[src="/static/photo/Reseident Evil.jpg"]').addEventListener("click", () => {
        window.location.href = "resident.html";
    });

    document.querySelector('img[src="/static/photo/gta5.jpg"]').addEventListener("click", () => {
        window.location.href = "gta.html";
    });

    document.querySelector('img[src="/static/photo/Dota2.jpg"]').addEventListener("click", () => {
        window.location.href = "Dota2.html";
    });

    document.querySelector('img[src="/static/photo/hogwarts.jpg"]').addEventListener("click", () => {
        window.location.href = "hogwarts.html";
    });

    document.querySelector('img[src="/static/photo/takken 8.jpg"]').addEventListener("click", () => {
        window.location.href = "takken8..html";
    });

    document.querySelector('img[src="/static/photo/PROJECT ZOMBOID.jpg"]').addEventListener("click", () => {
        window.location.href = "PROJECTZOMBOID.html";
    });

    document.querySelector('img[src="/static/photo/sims4.jpg"]').addEventListener("click", () => {
        window.location.href = "sims4.html";
    });

    document.querySelector('img[src="/static/photo/Read Dead.jpg"]').addEventListener("click", () => {
        window.location.href = "ReadDead.html";
    });

    document.querySelector('img[src="/static/photo/2k 25.jpg"]').addEventListener("click", () => {
        window.location.href = "NBA.html";
    });

    document.querySelector('img[src="/static/photo/RAFT.jpg"]').addEventListener("click", () => {
        window.location.href = "RAFT.html";
    });

    document.querySelector('img[src="/static/photo/Among Us.jpg"]').addEventListener("click", () => {
        window.location.href = "AMONGUS.html";
    });

    document.querySelector('img[src="/static/photo/Elden Ring.jpg"]').addEventListener("click", () => {
        window.location.href = "EldenRing.html";
    });

    document.querySelector('img[src="/static/photo/Spider.jpg"]').addEventListener("click", () => {
        window.location.href = "Spider.html";
    });

    document.querySelector('img[src="/static/photo/APEX.jpg"]').addEventListener("click", () => {
        window.location.href = "APEX.html";
    });

    document.querySelector('img[src="/static/photo/Horizon.jpg"]').addEventListener("click", () => {
        window.location.href = "Horizon.html";
    });

    document.querySelector('img[src="/static/photo/Subnatica.jpg"]').addEventListener("click", () => {
        window.location.href = "Subnatica.html";
    });

    document.querySelector('img[src="/static/photo/God of War.jpg"]').addEventListener("click", () => {
        window.location.href = "GodofWar.html";
    });

    document.querySelector('img[src="/static/photo/Big Ambitions.jpg"]').addEventListener("click", () => {
        window.location.href = "Big Ambitions.html";
    });



});
