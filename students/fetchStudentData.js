// Simulated API data (replace this with actual API endpoint later)
const studentID = "2403717662222040"; // This will come dynamically from login
const apiURL = `https://dummyjson.com/students/${studentID}`; // Replace with real endpoint later

// Function to fetch and update student data
function fetchStudentData() {
    fetch(apiURL) // Fetch data from the backend API
        .then(response => response.json())
        .then(data => {
            // Update the HTML with student data
            document.getElementById('student-name').innerText = data.name;
            document.getElementById('student-id').innerText = data.id;
            document.getElementById('student-course').innerText = data.course;
            document.getElementById('student-dob').innerText = data.dob;
            document.getElementById('student-contact').innerText = data.contact;
            document.getElementById('student-email').innerText = data.email;
            document.getElementById('student-address').innerText = data.address;
            document.getElementById('student-photo').src = data.photo_url;
        })
        .catch(error => {
            console.error("Error fetching student data:", error);
            alert("Failed to load student details.");
        });
}

// Call the function on page load
fetchStudentData();
