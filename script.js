
document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");

    // Get user gender from URL or Firebase
    const urlParams = new URLSearchParams(window.location.search);
    let gender = urlParams.get("gender");

    if (!gender) {
        // Fetch user data from Firestore if not in URL
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
                if (userDoc.exists) {
                    gender = userDoc.data().gender;
                    fetchProducts(gender);
                }
            } else {
                window.location.href = "index.html"; // Redirect to login if not authenticated
            }
        });
    } else {
        fetchProducts(gender);
    }
     
    const BACKEND_URL = "https://shopping-backend-yuqg.onrender.com/"; // Replace with your actual Render URL

    function fetchProducts(gender) {
        fetch(`${BACKEND_URL}/products?gender=${gender}`)
            .then(response => response.json())
            .then(data => displayProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    }
    

    function displayProducts(products) {
        productsContainer.innerHTML = "";
        if (products.length === 0) {
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

