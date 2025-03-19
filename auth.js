import { auth, db } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


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

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User logged in, redirecting to landing.html");
        window.location.href = `landing.html?gender=${userData.gender}`;
    }
});

export function logout() {
    signOut(auth).then(() => {
        console.log("User signed out.");
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}


import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";


async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Google Login Success:", result.user);
        window.location.href = "landing.html";
    } catch (error) {
        console.error("Google Login Failed:", error);
    }
}
window.googleLogin = googleLogin; // Attach to global scope


// Attach logout event listener (Make sure there's a logout button in HTML)
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}

document.getElementById("auth-btn").addEventListener("click", handleAuth);
document.getElementById("toggle-btn").addEventListener("click", toggleForm);
document.getElementById("google-login-btn").addEventListener("click", googleLogin);

