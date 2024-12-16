document.addEventListener("DOMContentLoaded", function() {
    const announcementContainer = document.getElementById('announcement-container');
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    const announcementForm = document.getElementById('announcement-form');

    // Load announcements
    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    displayAnnouncements(announcements);

    // Load comments
    function loadComments(announcementId) {
        let comments = JSON.parse(localStorage.getItem('comments')) || {};
        const commentsHtml = (comments[announcementId] || []).map(comment => `<div class="comment"><p>${comment}</p></div>`).join('');
        commentsContainer.innerHTML = commentsHtml;
    }

    // Display announcements
    function displayAnnouncements(announcements) {
        const announcementsHtml = announcements.map((announcement, index) => `
            <div class="announcement" data-id="${index}">
                <h4>${announcement.title}</h4>
                <p>${announcement.content}</p>
                <button onclick="loadComments(${index})">View Comments</button>
            </div>
        `).join('');
        announcementContainer.innerHTML = announcementsHtml;
    }

    // Post announcement
    announcementForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
        announcements.push({ title, content });
        localStorage.setItem('announcements', JSON.stringify(announcements));

        displayAnnouncements(announcements);

        // Clear form
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    });

    // Post comment
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = document.getElementById('comment').value;

        let comments = JSON.parse(localStorage.getItem('comments')) || {};
        const announcementId = event.target.closest('.announcement').getAttribute('data-id');

        if (!comments[announcementId]) {
            comments[announcementId] = [];
        }

        comments[announcementId].push(commentText);
        localStorage.setItem('comments', JSON.stringify(comments));

        // Display the comment
        const commentHtml = `<div class="comment"><p>${commentText}</p></div>`;
        commentsContainer.innerHTML += commentHtml;

        // Clear comment input
        document.getElementById('comment').value = '';
    });
});
