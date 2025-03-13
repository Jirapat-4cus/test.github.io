
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAuth , googleAuthProvider , signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-Auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyBCJKrZt1lU54uFmkka3HrtRPsILAL-zGQ",
    authDomain: "bj-app-24b96.firebaseapp.com",
    projectId: "bj-app-24b96",
    storageBucket: "bj-app-24b96.firebasestorage.app",
    messagingSenderId: "1045161773326",
    appId: "1:1045161773326:web:20554c66a8e34896f96f5f",
    measurementId: "G-MSYP0PK6D7"
  };

  const app = initializeApp(firebaseConfig);
  const provider = new googleAuthProvider();
  const auth = getAuth(app);
  auth.languageCode = 'en';

  const googleLogin = document.getElementById("google-login-btn");
    googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href = "index.html";

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

    });