
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(require("./trend-shop-71738-firebase-adminsdk-fbsvc-e4a2ef9b11.json")),
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

