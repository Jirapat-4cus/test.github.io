const firebaseConfig = {
    apiKey: "AIzaSyBCJKrZt1lU54uFmkka3HrtRPsILAL-zGQ",
    authDomain: "bj-app-24b96.firebaseapp.com",
    projectId: "bj-app-24b96",
    storageBucket: "bj-app-24b96.firebasestorage.app",
    messagingSenderId: "1045161773326",
    appId: "1:1045161773326:web:20554c66a8e34896f96f5f",
    measurementId: "G-MSYP0PK6D7"
};

firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", () => {
    const auth = firebase.auth();
    const profileName = document.querySelector(".profile span");
    const profilePic = document.querySelector(".profile-pic");

    auth.onAuthStateChanged((user) => {
        console.log("User:", user);

        if (user) {
            profileName.textContent = user.displayName || "ผู้ใช้ไม่มีชื่อ";
            profilePic.style.backgroundImage = `url(${user.photoURL || "https://www.thaimediafund.or.th/wp-content/uploads/2024/07/default-avatar-profile-icon-.jpg"})`;
        } else {
            profileName.textContent = "เข้าสู่ระบบ";
            profilePic.style.backgroundImage = `url("https://www.thaimediafund.or.th/wp-content/uploads/2024/07/default-avatar-profile-icon-.jpg")`;
        }
    });
});