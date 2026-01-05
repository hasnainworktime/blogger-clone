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

