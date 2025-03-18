import { auth, db } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let isSignup = false;

function toggleForm() {
    isSignup = !isSignup;
    
    document.getElementById("form-title").innerText = isSignup ? "Trend-Shop Signup" : "Trend-Shop Login";
    document.getElementById("gender").style.display = isSignup ? "block" : "none";
    document.getElementById("birthday").style.display = isSignup ? "block" : "none";
    document.getElementById("auth-btn").innerText = isSignup ? "Sign Up" : "Login";
    document.getElementById("toggle-btn").innerText = isSignup ? "Already have an account? Login" : "Signup";
}

async function handleAuth() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (isSignup) {
        const gender = document.getElementById("gender").value;
        const birthday = document.getElementById("birthday").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                gender: gender,
                birthday: birthday
            });

            alert("Signup successful! Redirecting...");
            window.location.href = `landing.html?gender=${gender}`;
        } catch (error) {
            alert(error.message);
        }
    } else {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                window.location.href = `landing.html?gender=${userData.gender}`;
            } else {
                alert("User data not found.");
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

// Auto-redirect on login
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        console.log("User is not logged in, staying on auth.html");
        return;
    }

    // Fetch user data and redirect only when logging in
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User logged in, redirecting to index.html");
        window.location.href = `landing.html?gender=${userData.gender}`;
    }
});

// Logout function
function logout() {
    signOut(auth).then(() => {
        console.log("User signed out.");
        localStorage.clear();  // Clears any stored session data
        sessionStorage.clear(); // Clears temporary session data
        window.location.href = "auth.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}

// Attach logout event listener (Make sure there's a logout button in HTML)
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}

document.getElementById("auth-btn").onclick = handleAuth;
document.getElementById("toggle-btn").onclick = toggleForm;
