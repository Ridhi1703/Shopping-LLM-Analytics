import { auth, db } from "./firebase-config.js"; // ✅ auth is already imported
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"; // ✅ Only import what is needed
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");
    const BACKEND_URL = "https://shopping-backend-yuqg.onrender.com";
    
    // Get user gender from URL
    const urlParams = new URLSearchParams(window.location.search);
    let gender = urlParams.get("gender");



    if (!gender) {
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(db, "users", user.uid));
                        if (userDoc.exists()) {
                            gender = userDoc.data().gender;
                        }
                    } catch (error) {
                        console.error("Error fetching user data from Firestore:", error);
                    }
                }

                // Default to "male" if gender is still not set
                if (!gender) gender = "male";

                fetchProducts(gender);
            });
        } catch (error) {
            console.error("Firebase authentication error:", error);
            gender = "male"; // Fallback if Firebase fails
            fetchProducts(gender);
        }
    } else {
        fetchProducts(gender);
    }

    async function fetchProducts(gender) {
        console.log(`Fetching products for gender: ${gender}`);

        try {
            const response = await fetch(`${BACKEND_URL}/products?gender=${gender}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched products:", data);
            displayProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
            productsContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        }
    }

    function displayProducts(products) {
        productsContainer.innerHTML = "";
        if (!products || products.length === 0) {
            productsContainer.innerHTML = "<p>No products available.</p>";
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.ImageURL}" alt="${product.Name}">
                <h3>${product.Name}</h3>
                <p>Price: $${product.Price}</p>
                <p>Stock: ${product.Stock} left</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }
});
