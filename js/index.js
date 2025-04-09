// index.js

document.addEventListener('DOMContentLoaded', () => {
    // navbar
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close');
    const link = document.getElementById('link');

    // Menu toggle functions
    function showLink() {
        menuBtn.style.display = 'none';
        link.classList.add('active');
        closeBtn.style.display = 'block'; // Changed to 'block' since it's a button
    }

    function hideLink() {
        menuBtn.style.display = 'block';
        link.classList.remove('active');
        closeBtn.style.display = 'none';
    }

    // Event listeners
    if (menuBtn) menuBtn.addEventListener('click', showLink);
    if (closeBtn) closeBtn.addEventListener('click', hideLink);
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    console.log('index.js loaded'); // Confirm script is running
    const blogPostsContainer = document.getElementById('blog-posts');

    if (!blogPostsContainer) {
        console.log('Error: #blog-posts element not found');
        return;
    }

    console.log('Found #blog-posts element');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    console.log('Posts from localStorage:', posts);

    blogPostsContainer.innerHTML = ''; // Clear existing content

    if (posts.length === 0) {
        blogPostsContainer.innerHTML = '<p>No blog posts yet.</p>';
    } else {
        posts.forEach(post => {
            blogPostsContainer.innerHTML += `
                <div class="blog-post">
                    <h3>${post.title}</h3>
                    <p class="blog-date">${formatDate(post.date)}</p>
                    <p>${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
                </div>
            `;
        });
    }
});
// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        document.getElementById('form-message').textContent = 'Message sent successfully!';
        document.getElementById('contact-form').reset();
    } else {
        document.getElementById('form-message').textContent = 'Please fill in all fields.';
        document.getElementById('form-message').style.color = 'red';
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}