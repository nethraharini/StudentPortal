document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch faculty data
    async function fetchFacultyData() {
        try {
            const response = await fetch('/api/faculty/details');
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const faculty = await response.json();
            displayFacultyDetails(faculty);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    // Function to display faculty details
    function displayFacultyDetails(faculty) {
        const facultyDetailsContainer = document.getElementById('faculty-details');
        facultyDetailsContainer.innerHTML = ''; // Clear previous content

        const facultyDiv = document.createElement('div');
        facultyDiv.classList.add('faculty-card');

        facultyDiv.innerHTML = `
            <h3>${faculty.name}</h3>
            <p><b>ID:</b> ${faculty.id}</p>
            <p><b>Course:</b> ${faculty.course}</p>
            <p><b>DOB:</b> ${faculty.dob}</p>
            <p><b>Contact:</b> ${faculty.contact}</p>
            <p><b>Email:</b> ${faculty.email}</p>
            <p><b>Address:</b> ${faculty.address}</p>
        `;

        facultyDetailsContainer.appendChild(facultyDiv);

        // Update sidebar with faculty info
        document.getElementById('faculty-name').textContent = faculty.name;
        document.getElementById('faculty-id').textContent = faculty.id;
        document.getElementById('faculty-course').textContent = faculty.course;
        document.getElementById('faculty-dob').textContent = faculty.dob;
        document.getElementById('faculty-contact').textContent = faculty.contact;
        document.getElementById('faculty-email').textContent = faculty.email;
        document.getElementById('faculty-address').textContent = faculty.address;
    }

    // Fetch faculty data on page load
    fetchFacultyData();
});
