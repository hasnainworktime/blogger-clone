let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
function savePost() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  const post = {
    title,
    category,
    content,
    author: "Muhammad Hasnain"
  };

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Post Published!");
  window.location.href = "index.html";
}
function loadPosts() {
  const container = document.getElementById("postsContainer");
  if (!container) return;

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  container.innerHTML = "";

  posts.forEach((post, index) => {
    container.innerHTML += `
      <div class="blog-card">
        <h2>
          <a href="post.html?index=${index}">${post.title}</a>
        </h2>
        <p class="excerpt">${post.content.substring(0, 100)}...</p>
        <p class="meta">By ${post.author} | ${post.category}</p>
        <button onclick="deletePost(${index})">Delete</button>
      </div>
    `;
  });
}

function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}

loadPosts();
const params = new URLSearchParams(window.location.search);
const postIndex = params.get("index");

if (postIndex !== null) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts[postIndex];

  document.getElementById("post-title").innerText = post.title;
  document.getElementById("post-meta").innerText =
    `By ${post.author} | ${post.category}`;
  document.getElementById("post-content").innerText = post.content;

  loadComments();
}

function addComment() {
  const comment = document.getElementById("commentInput").value;
  if (!comment) return;

  let comments = JSON.parse(localStorage.getItem("comments_" + postIndex)) || [];
  comments.push(comment);
  localStorage.setItem("comments_" + postIndex, JSON.stringify(comments));

  document.getElementById("commentInput").value = "";
  loadComments();
}
div.innerHTML = `
  <h2>${post.title}</h2>
  <p>${post.content.substring(0, 100)}...</p>
  <small>By ${post.author} | ${post.category}</small>
  <br><br>
  <button onclick="editPost(${post.id})">Edit</button>
  <button onclick="deletePost(${post.id})">Delete</button>
`;

function loadComments() {
  const list = document.getElementById("commentList");
  if (!list) return;

  let comments = JSON.parse(localStorage.getItem("comments_" + postIndex)) || [];
  list.innerHTML = "";
  comments.forEach(c => {
    list.innerHTML += `<li>${c}</li>`;
  });
}
document.getElementById("search")?.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const cards = document.querySelectorAll(".blog-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});
const posts = {
  ai: {
    title: "How AI is Changing Web Development",
    author: "Muhammad Hasnain",
    category: "Technology",
    content: `
      <p>Artificial Intelligence is transforming how websites are built.</p>
      <p>AI tools help developers write better code faster.</p>
      <p>The future of web development is smart and automated.</p>
    `
  },

  freelancing: {
    title: "10 Tips for Freelancers",
    author: "Muhammad Hasnain",
    category: "Business",
    content: `
      <p>Freelancing gives freedom and flexibility.</p>
      <p>Build strong communication skills.</p>
      <p>Always deliver quality work on time.</p>
    `
  },

  travel: {
    title: "My Travel Journey to Northern Areas",
    author: "Muhammad Hasnain",
    category: "Travel",
    content: `
      <p>The northern areas of Pakistan are breathtaking.</p>
      <p>Mountains, valleys, and fresh air refresh the soul.</p>
      <p>This journey was unforgettable.</p>
    `
  }
};

const params = new URLSearchParams(window.location.search);
const postKey = params.get("post");

if (posts[postKey]) {
  document.querySelector(".post-title").innerText = posts[postKey].title;
  document.querySelector(".post-meta").innerHTML =
    `By <strong>${posts[postKey].author}</strong> | ${posts[postKey].category}`;
  document.querySelector(".post-content").innerHTML = posts[postKey].content;
}
function savePost() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;

  if (!title || !author || !content) {
    alert("Please fill all fields");
    return;
  }

  const post = {
    id: Date.now(),
    title,
    author,
    category,
    content
  };

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Post Published!");
  window.location.href = "index.html";
}
const postContainer = document.getElementById("posts");

if (postContainer) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.reverse().forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card";
    div.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content.substring(0, 100)}...</p>
      <small>By ${post.author} | ${post.category}</small>
    `;
    postContainer.appendChild(div);
  });
}
function editPost(id) {
  window.location.href = `edit.html?id=${id}`;
}

function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter(post => post.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));
  location.reload();
}
const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

if (editId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id == editId);

  if (post) {
    document.getElementById("title").value = post.title;
    document.getElementById("author").value = post.author;
    document.getElementById("category").value = post.category;
    document.getElementById("content").value = post.content;
  }
}
function updatePost() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  const updatedPost = {
    id: Number(editId),
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    content: document.getElementById("content").value
  };

  posts = posts.map(p => p.id == editId ? updatedPost : p);
  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Post Updated!");
  window.location.href = "index.html";
}
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentList.innerHTML = "";
  comments.forEach(comment => {
    const li = document.createElement("li");
    li.textContent = comment;
    commentList.appendChild(li);
  });
}

function addComment() {
  if (commentInput.value === "") return;

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(commentInput.value);
  localStorage.setItem("comments", JSON.stringify(comments));

  commentInput.value = "";
  loadComments();
}

loadComments();
const commentBtn = document.getElementById("addComment");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

commentBtn.addEventListener("click", () => {
  const comment = commentInput.value.trim();
  if (comment === "") return;

  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));

  commentInput.value = "";
  loadComments();
});

function loadComments() {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentList.innerHTML = "";
  comments.forEach(c => {
    const p = document.createElement("p");
    p.textContent = c;
    commentList.appendChild(p);
  });
}

loadComments();
function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card";
    div.innerHTML = `
      <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
      <p>${post.content.substring(0, 100)}...</p>
      <small>${post.category}</small>
    `;
    container.appendChild(div);
  });
}
renderPosts(allPosts);
document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  renderPosts(filtered);
});
function filterCategory(cat) {
  if (cat === "All") {
    renderPosts(allPosts);
  } else {
    const filtered = allPosts.filter(p => p.category === cat);
    renderPosts(filtered);
  }
}

