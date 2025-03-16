// นำเข้า Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔥 ตั้งค่า Firebase Config (เปลี่ยนเป็นค่าของโปรเจกต์คุณ)
const firebaseConfig = {
    apiKey: "AIzaSyBCJKrZt1lU54uFmkka3HrtRPsILAL-zGQ",
    authDomain: "bj-app-24b96.firebaseapp.com",
    projectId: "bj-app-24b96",
    storageBucket: "bj-app-24b96.firebasestorage.app",
    messagingSenderId: "1045161773326",
    appId: "1:1045161773326:web:20554c66a8e34896f96f5f",
    measurementId: "G-MSYP0PK6D7"
  };

// 🔥 เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const postsRef = ref(db, "posts"); // โหนดสำหรับเก็บโพสต์

// ดึง Elements จาก HTML
const addBtn = document.querySelector('.add-btn');
const postModal = document.getElementById('post-modal');
const closeBtn = document.querySelector('.close');
const postContent = document.getElementById('post-content');
const colorOptions = document.querySelectorAll('.color-option');
const anonymousCheckbox = document.getElementById('anonymous-checkbox');
const postBtn = document.getElementById('post-btn');
const postGrid = document.getElementById('post-grid');

let selectedColor = '#ffcccc'; // Default color

// 🎨 เลือกสีของโพสต์
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedColor = option.dataset.color;
    });
});

// 📌 เปิด/ปิด Modal
addBtn.addEventListener('click', () => { postModal.style.display = 'block'; });
closeBtn.addEventListener('click', () => { postModal.style.display = 'none'; });
window.addEventListener('click', (event) => {
    if (event.target == postModal) {
        postModal.style.display = 'none';
    }
});

// 📌 กดปุ่มโพสต์
postBtn.addEventListener('click', () => {
    const content = postContent.value;
    const anonymous = anonymousCheckbox.checked;

    if (content.trim() === "") {
        alert("กรุณากรอกข้อความก่อนโพสต์!");
        return;
    }

    // ✅ บันทึกลง Firebase
    const newPostRef = push(postsRef);
    set(newPostRef, {
        id: newPostRef.key, // ใช้ key เป็น ID
        content: content,
        color: selectedColor,
        anonymous: anonymous,
        timestamp: Date.now()
    });

    postContent.value = ''; // ล้างช่องกรอกข้อมูล
    postModal.style.display = 'none'; // ปิด Modal
});

// 📌 ฟังก์ชันสร้าง Post-it
function createPostIt(post) {
    const postIt = document.createElement('div');
    postIt.classList.add('post-it');
    postIt.style.backgroundColor = post.color;
    postIt.textContent = post.content;
    postIt.setAttribute("data-id", post.id); // เก็บ ID ไว้ที่ element
    postGrid.appendChild(postIt);
}

// 📌 โหลดโพสต์ที่มีอยู่ใน Firebase
onChildAdded(postsRef, (snapshot) => {
    const post = snapshot.val();
    createPostIt(post);

    setTimeout(() => {
        remove(ref(db, `posts/${post.id}`)); // ลบจาก Firebase
    }, 60 * 1000); // 1 นาที

});

// 📌 ลบโพสต์ออกจากหน้าจอเมื่อถูกลบจาก Firebase
onChildRemoved(postsRef, (snapshot) => {
    const postId = snapshot.key;
    const postElement = document.querySelector(`[data-id="${postId}"]`);
    if (postElement) {
        postElement.remove(); // ลบออกจาก DOM
    }
});
