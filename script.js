
// document.addEventListener("DOMContentLoaded", async () => {
//     const productsContainer = document.getElementById("products-container");

//     const BACKEND_URL = "https://shopping-backend-yuqg.onrender.com/";

//     // Get user gender from URL or Firebase
//     const urlParams = new URLSearchParams(window.location.search);
//     let gender = urlParams.get("gender");

//     if (!gender) {
//         // Fetch user data from Firestore if not in URL
//         firebase.auth().onAuthStateChanged(async (user) => {
//             if (user) {
//                 const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
//                 if (userDoc.exists) {
//                     gender = userDoc.data().gender;
//                     fetchProducts(gender);
//                 }
//             } else {
//                 window.location.href = "index.html"; // Redirect to login if not authenticated
//             }
//         });
//     } else {
//         fetchProducts(gender);
//     }
     


//     function fetchProducts(gender) {
//         fetch(`${BACKEND_URL}/products?gender=${gender}`)
//             .then(response => response.json())
//             .then(data => displayProducts(data))
//             .catch(error => console.error("Error fetching products:", error));
//     }
    

//     function displayProducts(products) {
//         productsContainer.innerHTML = "";
//         if (products.length === 0) {
//             productsContainer.innerHTML = "<p>No products available.</p>";
//             return;
//         }

//         products.forEach(product => {
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
//     }
// });

document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");

    const BACKEND_URL = "https://shopping-backend-yuqg.onrender.com";

    // Ensure Firebase is loaded before using it
    if (typeof firebase === "undefined") {
        console.error("Firebase SDK not loaded!");
        return;
    }

    // Get user gender from URL
    const urlParams = new URLSearchParams(window.location.search);
    let gender = urlParams.get("gender");

    if (!gender) {
        try {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
                    if (userDoc.exists) {
                        gender = userDoc.data().gender;
                    }
                } 

                // If gender is still not set, default to "male"
                if (!gender) gender = "male";

                fetchProducts(gender);
            });
        } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
            gender = "male"; // Fallback if Firebase fails
            fetchProducts(gender);
        }
    } else {
        fetchProducts(gender);
    }

    function fetchProducts(gender) {
        console.log(`Fetching products for gender: ${gender}`); // Debugging log

        fetch(`${BACKEND_URL}/products?gender=${gender}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched products:", data); // Debugging log
                displayProducts(data);
            })
            .catch(error => console.error("Error fetching products:", error));
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