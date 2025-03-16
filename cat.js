
document.addEventListener("DOMContentLoaded", () => {
    const auth = firebase.auth();  // ✅ ใช้ firebase.auth() ที่มาจาก `<script>` ไม่ต้อง import
    const profile = document.querySelector(".profile span");
    const profilePic = document.querySelector(".profile-pic");

    auth.onAuthStateChanged((user) => {
        console.log("User:", user); // ✅ Debug เช็คว่ามีข้อมูล user มั้ย?

        if (user) {
            profile.textContent = user.displayName || "ผู้ใช้ไม่มีชื่อ";
            profilePic.style.backgroundImage = `url(${user.photoURL || "https://www.thaimediafund.or.th/wp-content/uploads/2024/07/default-avatar-profile-icon-.jpg"})`;
        } else {
            profile.textContent = "เข้าสู่ระบบ";
            profilePic.style.backgroundImage = `url("https://www.thaimediafund.or.th/wp-content/uploads/2024/07/default-avatar-profile-icon-.jpg")`;
        }
    });
});







function updateFav(){
    let favSec = document.querySelector("#favsec");
    let favCon = favSec.querySelector(".section-content");

    document.querySelectorAll(".category[fav='true']").forEach(favcat => {
        favCon.appendChild(favcat.closest("a").cloneNode(true));
    });

    if (favCon.children.length > 0) {
        favSec.style.display = "block";
    }
    else favSec.style.display = "none";
}

window.onload = updateFav();

document.querySelectorAll(".category").forEach(cat => {
    let tt = cat.querySelector(".category-title").innerHTML;
    cat.setAttribute("title", tt);
})