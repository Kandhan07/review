// Display the popup when the "+" button is clicked
function clickplusbutton() {
    document.getElementById('popup1').style.display = 'block';
    document.getElementById('overlay').style.display = 'block'; // Optional: show overlay
}

// Hide the popup when "Cancel" is clicked
function cancelbutton() {
    document.getElementById('popup1').style.display = 'none';
    document.getElementById('overlay').style.display = 'none'; // Optional: hide overlay
}

// Function to add a movie review to the DOM
function addMovieToDOM(movie) {
    const newReview = document.createElement('div');
    newReview.classList.add('gameof');

    // Create image element
    const movieImage = document.createElement('img');
    movieImage.classList.add('gameofimage');
    movieImage.src = movie.image || 'images/default.jpg'; // Use stored image or default
    movieImage.alt = movie.movieName;

    // Create movie details elements
    const movieTitle = `<h1 style="color: #fd6569;">${movie.movieName}</h1>`;
    const releaseDate = `<h3 class="reele">Released On:</h3><h2 class="Yea">${movie.movieYear}</h2>`;
    const watchLink = `<h2 class="link12" onclick="window.open('${movie.movieLink}', '_blank')" style="cursor: pointer;">Watch</h2>`;
    const movieReviewText = `<p style="padding: 5px;">${movie.review}</p>`;
    const reviewerInfo = `<h4 class="reviewwdby">Reviewed by:</h4><h3 class="reviewname">${movie.name}</h3><br>
                          <h4 class="email1">Email:</h4><h3 class="Emailid">${movie.email}</h3>`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'DELETE';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.fontWeight = 'bold';
    deleteButton.onclick = function() {
        newReview.remove(); // Remove the div from the DOM
        deleteMovieFromStorage(movie.movieName); // Remove from localStorage
    };

    // Append all elements to the new review div
    newReview.innerHTML = `
        ${movieTitle}
        ${releaseDate}
        ${watchLink}
        ${movieReviewText}
        ${reviewerInfo}
    `;
    newReview.prepend(movieImage); // Add image at the top
    newReview.appendChild(deleteButton); // Add the delete button at the end

    // Add the new review to the container
    document.getElementById('container').appendChild(newReview);
}

// Handle the Add Movie form submission
document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get the form input values
    const name = document.getElementById('yourname').value;
    const email = document.getElementById('youremail').value;
    const movieName = document.getElementById('moviename').value;
    const movieLink = document.getElementById('movielink').value;
    const movieYear = document.getElementById('Year').value;
    const review = document.getElementById('review1').value;
    const imageFile = document.getElementById('file-upload').files[0];

    // Check if a file is uploaded and if it's an image
    if (imageFile) {
        if (!imageFile.type.startsWith('image/')) {
            alert('Please upload a valid image file (jpg, png, etc.).');
            return; // Exit if not an image
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const movieImage = event.target.result;
            saveAndDisplayMovie({ name, email, movieName, movieLink, movieYear, review, image: movieImage });
        };
        reader.readAsDataURL(imageFile); // Read the image file
    } else {
        // If no image is uploaded, use a default placeholder image
        saveAndDisplayMovie({ name, email, movieName, movieLink, movieYear, review, image: 'images/default.jpg' });
    }

    // Hide the popup and reset the form
    cancelbutton();
    document.getElementById('movieForm').reset();
    document.getElementById('textimage').textContent = 'No file chosen'; // Reset image file text
});

// Save the movie to localStorage and display it
function saveAndDisplayMovie(movie) {
    // Get the existing movies from localStorage
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    
    // Add the new movie to the array
    movies.push(movie);

    // Save the updated movies array to localStorage
    localStorage.setItem('movies', JSON.stringify(movies));

    // Add the movie to the DOM
    addMovieToDOM(movie);
    alert(`${movie.movieName} has been added successfully!`);
}

// Load movies from localStorage when the page loads
window.onload = function() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.forEach(addMovieToDOM); // Add each saved movie to the DOM
};

// Delete movie from localStorage
function deleteMovieFromStorage(movieName) {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    // Filter out the movie to be deleted
    movies = movies.filter(movie => movie.movieName !== movieName);

    // Update localStorage with the remaining movies
    localStorage.setItem('movies', JSON.stringify(movies));
}

// Handle file upload text change
document.getElementById('file-upload').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.getElementById('textimage').textContent = fileName;
});

// Reset the form on clicking reset button
function restbutton() {
    document.getElementById('movieForm').reset();
    document.getElementById('textimage').textContent = 'No file chosen'; // Reset image file text
}
// Function to update character count
function updateCharCount() {
    const textarea = document.getElementById('review1');
    const remaining = 400 - textarea.value.length;
    document.getElementById('charCount').textContent = `${remaining} characters remaining`;
}

// Reset the form and character count on clicking reset button
function restbutton() {
    document.getElementById('movieForm').reset();
    document.getElementById('textimage').textContent = 'No file chosen'; // Reset image file text
    updateCharCount(); // Reset character count display
}
