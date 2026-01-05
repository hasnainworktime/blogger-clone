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

