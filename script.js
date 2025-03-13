const addBtn = document.querySelector('.add-btn');
const postModal = document.getElementById('post-modal');
const closeBtn = document.querySelector('.close');
const postContent = document.getElementById('post-content');
const colorOptions = document.querySelectorAll('.color-option');
const anonymousCheckbox = document.getElementById('anonymous-checkbox');
const postBtn = document.getElementById('post-btn');
const postGrid = document.getElementById('post-grid');

let selectedColor = '#ffcccc'; // Default color

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedColor = option.dataset.color;
    });
});

addBtn.addEventListener('click', () => {
    postModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    postModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == postModal) {
        postModal.style.display = 'none';
    }
});

postBtn.addEventListener('click', () => {
    const content = postContent.value;
    const anonymous = anonymousCheckbox.checked;
    createPostIt(content, selectedColor, anonymous);
    postContent.value = '';
    postModal.style.display = 'none';
});

function createPostIt(content, color, anonymous) {
    const postIt = document.createElement('div');
    postIt.classList.add('post-it');
    postIt.style.backgroundColor = color;
    postIt.textContent = content;
    postGrid.appendChild(postIt);
}

// Load existing posts from local storage (if any)
const posts = JSON.parse(localStorage.getItem('posts')) || [];
posts.forEach(post => {
    createPostIt(post.content, post.color, post.anonymous);
});

// Save posts to local storage
window.addEventListener('beforeunload', () => {
    const postIts = document.querySelectorAll('.post-it');
    const posts = [];
    postIts.forEach(postIt => {
        posts.push({
            content: postIt.textContent,
            color: postIt.style.backgroundColor,
            anonymous: anonymousCheckbox.checked // Assuming anonymous mode is the same for all posts
        });
    });
    localStorage.setItem('posts', JSON.stringify(posts));
});

// ตั้งเวลาให้ Post-it ทั้งหมดหายไปทุกๆ 1 นาที
setInterval(() => {
    const postIts = document.querySelectorAll('.post-it');
    postIts.forEach(postIt => {
        postIt.remove();
    });
}, 60 * 1000); // 1 นาที * 60 วินาที * 1000 มิลลิวินาที