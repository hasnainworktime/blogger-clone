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

