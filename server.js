// const express = require("express");
// const cors = require("cors");
// const admin = require("firebase-admin");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ Initialize Firebase Admin SDK
// const serviceAccount = require("./trend-shop-71738-firebase-adminsdk-fbsvc-11eff928ec.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// // ✅ Firestore Database Instance
// const db = admin.firestore();

// // ✅ Default Route to Test Server
// app.get("/", (req, res) => {
//   res.send("🔥 Welcome to Trend-Shop API. Server is running!");
// });

// // ✅ API Route: Get Products based on Gender
// app.get("/products", async (req, res) => {
    
//   try {
//     const { gender } = req.query;
//     if (!gender) return res.status(400).json({ error: "Gender is required" });

//     const productsRef = db.collection("products");
//     const snapshot = await productsRef.where("Category", "==", gender).get();

//     if (snapshot.empty) return res.status(404).json({ error: "No products found" });

//     const products = [];
//     snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(require("./trend-shop-71738-firebase-adminsdk-fbsvc-11eff928ec.json")),
    databaseURL: "https://trend-shop-71738-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// API to fetch products by gender
app.get("/products", async (req, res) => {
    const gender = req.query.gender || "male";
    
    try {
        const snapshot = await db.collection("products").where("Category", "==", gender).get();
        let products = [];
        snapshot.forEach(doc => {
            products.push(doc.data());
        });

        res.json(products.length ? products : { "error": "No products found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

