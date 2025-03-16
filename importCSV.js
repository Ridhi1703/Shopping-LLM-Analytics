const admin = require("firebase-admin");
const csv = require("csv-parser");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./trend-shop-71738-firebase-adminsdk-fbsvc-11eff928ec.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const productsRef = db.collection("products");

// Function to import CSV data
async function importCSV() {
  const products = [];

  // Read CSV file and convert to JSON
  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
    })
    .on("end", async () => {
      console.log("✅ CSV file successfully processed.");

      const batch = db.batch();
      products.forEach((product) => {
        const docRef = productsRef.doc(); // Auto-generate document ID
        batch.set(docRef, product);
      });

      await batch.commit();
      console.log("✅ Bulk data successfully uploaded to Firestore!");
    });
}

// Run the function
importCSV().catch(console.error);
