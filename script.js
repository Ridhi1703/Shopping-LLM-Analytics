// document.addEventListener("DOMContentLoaded", () => {
//     const genderSelect = document.getElementById("gender-select");
//     const productsContainer = document.getElementById("products-container");

//     // Function to fetch products from backend
//     // function fetchProducts(gender) {
//     //     fetch(`http://localhost:5000/products?gender=${gender}`)
//     //         .then(response => response.json())
//     //         .then(data => displayProducts(data))
//     //         .catch(error => console.error("Error fetching products:", error));
//     // }
//     function fetchProducts(gender) {
//         console.log(`Fetching products for gender: ${gender}...`); // Debugging line
    
//         fetch(`http://localhost:5000/products?gender=${gender}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log("API Response:", data); // Log the response
//                 displayProducts(data);
//             })
//             .catch(error => console.error("Error fetching products:", error));
//     }
    

//     // Function to display products dynamically
//     function displayProducts(products) {
//         console.log("Rendering products..."); // Debugging line

//         productsContainer.innerHTML = ""; // Clear previous products
//          if (!Array.isArray(products) || products.length === 0) {
//         console.warn("No products available.");
//         productsContainer.innerHTML = "<p>No products available.</p>";
//         return;
//     }
        
//         products.forEach(product => {
//             console.log("Rendering product:", product.Name); // Log each product name
//             const productCard = document.createElement("div");
//             productCard.classList.add("product-card");

//             productCard.innerHTML = `
//                 <img src="${product.ImageURL}" alt="${product.Name}">
//                 <h3>${product.Name}</h3>
//                 <p>Price: $${product.Price}</p>
//                 <p>Stock: ${product.Stock} left</p>
//             `;
//             productsContainer.appendChild(productCard);
//         });
//         console.log("All products rendered successfully!");
//     }

//     // Fetch initial data (default to male products)
//     fetchProducts("male");

//     // Update products on gender change
//     genderSelect.addEventListener("change", (e) => {
//         fetchProducts(e.target.value);
//     });
// });


////////New///////////

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
                window.location.href = "auth.html"; // Redirect to login if not authenticated
            }
        });
    } else {
        fetchProducts(gender);
    }

    function fetchProducts(gender) {
        fetch(`http://localhost:5000/products?gender=${gender}`)
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

