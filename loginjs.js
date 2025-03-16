// Import Firebase SDK (สำหรับโมดูล)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ ตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCJKrZt1lU54uFmkka3HrtRPsILAL-zGQ",
    authDomain: "bj-app-24b96.firebaseapp.com",
    projectId: "bj-app-24b96",
    storageBucket: "bj-app-24b96.firebasestorage.app",
    messagingSenderId: "1045161773326",
    appId: "1:1045161773326:web:20554c66a8e34896f96f5f",
    measurementId: "G-MSYP0PK6D7"
};

// ✅ เริ่มต้น Firebase (ใช้ compat)
firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 👉 ฟังก์ชันล็อกอินด้วย Google
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ Login Success:", user.displayName, user.email);
        alert(`Welcome, ${user.displayName}!`);
        window.location.href = "index.html";
    } catch (error) {
        /*console.error("❌ Login Error:", error.message);
        alert("Login Failed! " + error.message);*/
    }
}


// 👉 ผูกฟังก์ชันกับปุ่มใน HTML
document.getElementById("google-login-btn").addEventListener("click", signInWithGoogle);
