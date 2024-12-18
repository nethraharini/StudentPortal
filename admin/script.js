// manage_announcements.js

// Array to store the announcements
let announcements = [];

// Function to render announcements on the page
function renderAnnouncements() {
    const announcementList = document.getElementById('announcement-list');
    announcementList.innerHTML = ''; // Clear existing list

    announcements.forEach((announcement, index) => {
        const announcementElement = document.createElement('div');
        announcementElement.classList.add('announcement');
        
        // Create announcement content
        const announcementContent = `
            <h3>Announcement ${index + 1}</h3>
            <p>${announcement}</p>
        `;
        
        announcementElement.innerHTML = announcementContent;

        // Add delete button to each announcement
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteAnnouncement(index);
        });

        announcementElement.appendChild(deleteButton);
        announcementList.appendChild(announcementElement);
    });
}

// Function to add a new announcement
function addAnnouncement(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const announcementText = document.getElementById('announcement-text').value;
    if (announcementText) {
        announcements.push(announcementText);
        renderAnnouncements();
        document.getElementById('announcement-text').value = ''; // Clear text area
    }
}

// Function to delete an announcement
function deleteAnnouncement(index) {
    announcements.splice(index, 1);
    renderAnnouncements();
}

// Attach event listener to the announcement form
const announcementForm = document.getElementById('announcement-form');
announcementForm.addEventListener('submit', addAnnouncement);

// Initial render of announcements (if any)
renderAnnouncements();
