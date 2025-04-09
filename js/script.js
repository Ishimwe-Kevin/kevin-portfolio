// script.js
document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blog-form');
    const blogList = document.getElementById('blog-list');
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Display posts on load
    displayPosts();

    // Handle form submission
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('blog-id').value || Date.now().toString();
        const post = {
            id,
            title: document.getElementById('blog-title').value,
            date: document.getElementById('blog-date').value,
            content: document.getElementById('blog-content').value
        };

        // Update or add post
        if (document.getElementById('blog-id').value) {
            posts = posts.map(p => p.id === id ? post : p);
        } else {
            posts.unshift(post);
        }

        // Save and reset
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        blogForm.reset();
        document.getElementById('blog-id').value = '';
        displayPosts();
    });

    // Display posts
    function displayPosts() {
        blogList.innerHTML = posts.map(post => `
            <div class="blog-post">
                <h4>${post.title}</h4>
                <p class="post-date">${formatDate(post.date)}</p>
                <p>${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
                <div class="post-actions">
                    <button class="btn-edit" data-id="${post.id}">Edit</button>
                    <button class="btn-delete" data-id="${post.id}">Delete</button>
                </div>
            </div>
        `).join('');

        // Add event listeners
        blogList.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', handleEdit));
        blogList.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', handleDelete));
    }

    // Format date
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Edit post
    function handleEdit(e) {
        const post = posts.find(p => p.id === e.target.dataset.id);
        if (post) {
            document.getElementById('blog-title').value = post.title;
            document.getElementById('blog-date').value = post.date;
            document.getElementById('blog-content').value = post.content;
            document.getElementById('blog-id').value = post.id;
        }
    }

    // Delete post
    function handleDelete(e) {
        if (confirm('Are you sure you want to delete this post?')) {
            posts = posts.filter(p => p.id !== e.target.dataset.id);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            displayPosts();
        }
    }
});