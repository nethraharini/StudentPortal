// Mock API for demonstration purposes
const apiUrl = 'https://api.example.com/students';

// Fetch and display students
function fetchStudents() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateStudentTable(data, 'student-list');
            updateStudentTable(data, 'faculty-student-list');
        })
        .catch(error => console.error('Error fetching students:', error));
}

// Add student
document.getElementById('student-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('student-name').value;
    const age = document.getElementById('student-age').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Student added:', data);
        fetchStudents(); // Refresh the list
        document.getElementById('student-form').reset();
    })
    .catch(error => console.error('Error adding student:', error));
});

// Update student
function updateStudent(studentId, updatedData) {
    fetch(`${apiUrl}/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Student updated:', data);
        fetchStudents(); // Refresh the list
    })
    .catch(error => console.error('Error updating student:', error));
}

// Delete student
function deleteStudent(studentId) {
    fetch(`${apiUrl}/${studentId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Student deleted:', data);
        fetchStudents(); // Refresh the list
    })
    .catch(error => console.error('Error deleting student:', error));
}

// Utility to update the student table
function updateStudentTable(students, tableId) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ''; // Clear the existing rows

    students.forEach(student => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = student.id;
        row.insertCell().textContent = student.name;
        row.insertCell().textContent = student.age;
        const actionsCell = row.insertCell();

        // Edit button (for demonstration, assuming the first column is ID)
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editStudent(student);
        actionsCell.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteStudent(student.id);
        actionsCell.appendChild(deleteButton);
    });
}

// Fetch students on page load
fetchStudents();
