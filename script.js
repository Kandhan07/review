// selcting
var overley = document.querySelector(".overley")
var popup = document.querySelector(".popup1")
var game = document.getElementById("gameoff")
var moivename = document.getElementById("moivename")
var year1 = document.getElementById("Year12")
var moivelink = document.getElementById("moivelink")
var review = document.getElementById("review1")
var addmoive = document.getElementById("addmoive")
var addone = document.getElementById("addone")
var container = document.getElementById("container")
var deletee1 = document.getElementById("deletee")



function plus()
{
    overley.style.display="block"
    popup.style.display="block"

}

function addcancel(event)
{
    overley.style.display="none"
    popup.style.display="none"
    
    

}

function deletee(event)
{
    event.target.parentElement.remove();
}

document.getElementById('file-upload').addEventListener('change', function() {
    const fileName = this.files[0]?.name || 'No file chosen';
    document.querySelector('.file-name').textContent = fileName;
});


// divaddd
// Get all necessary DOM elements
var yourname = document.getElementById("yourname");
var youremail = document.getElementById("youremail");
var Year12 = document.getElementById("Year12");
var overley = document.querySelector(".overley");
var popup = document.querySelector(".popup1");
var game = document.getElementById("gameoff");
var moivename = document.getElementById("moivename");
var year1 = document.getElementById("Year12");
var moivelink = document.getElementById("moivelink");
var review = document.getElementById("review1");
var addmoive = document.getElementById("addmoive");
var addone = document.getElementById("addone");
var container = document.getElementById("container");
var deletee1 = document.getElementById("deletee");
var imageInput = document.getElementById("file-upload");

// Store the image URL
let imageURL = '';

// Event listener for image upload
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imageURL = e.target.result; // Save the image URL (base64 encoded)
        };
        
        reader.readAsDataURL(file); // Convert the image to a data URL
    }
});

// Add movie review
function addmoive1() {
    // Check if any field is empty
    if (moivename.value.trim() === "" || moivelink.value.trim() === "" || year1.value.trim() === "" || review.value.trim() === "" || yourname.value.trim() === "" || youremail.value.trim() === "") {
        alert("Please fill in all fields before adding a movie review.");
        return;  // Exit the function without adding the movie review
    }

    // Check if an image is selected
    if (!imageURL) {
        alert("Please upload an image.");
        return;
    }

    var div = document.createElement("div");
    div.setAttribute("class", "gameof");

    // Add the image and other movie details
    div.innerHTML = `
        <img class="gameofimage" src="${imageURL}" alt="Movie Image">
        <h1 style="color: #fd6569;">${moivename.value}</h1>
        <h3 class="reele">Released On:</h3>
        <h2 class="Yea">${Year12.value}</h2>
        <h2 class="link12" onclick="window.open('${moivelink.value}', '_blank')" style="cursor: pointer;">watch</h2>
        <p style="padding: 5px;">${review.value}</p>
        <h4 class="reviewwdby">Reviewed by:</h4>
        <h3 class="reviewname">${yourname.value}</h3><br>
        <h4 class="email1">Email:</h4>
        <h3 class="Emailid">${youremail.value}</h3><br>
        <button id="deletee" style="padding: 5px; margin: 10px; width: 80px; background-color: #fd6569; border-radius: 10px; cursor: pointer; border: none;" onclick="deletee(event)">Delete</button>
    `;

    // Append the newly created div to the container
    container.append(div);

    // Clear input fields after adding the movie review
    overley.style.display = "none";
    popup.style.display = "none";
    moivelink.value = "";
    moivename.value = "";
    year1.value = "";
    review.value = "";
    yourname.value = "";
    youremail.value = "";
    imageURL = "";  // Clear the imageURL after adding the review

    alert("Successfully added a movie review");
}

 // Display the selected file name next to the button
 document.getElementById('file-upload').addEventListener('change', function() {
    const fileName = this.files[0]?.name || 'No file chosen';
    document.querySelector('.file-name').textContent = fileName;
});

function resert()
{
    moivelink.value=""  
    moivename.value=""
    year1.value=""
    review.value=""
    yourname.value=""
    youremail.value=""
}
 

// Utility function to save movie data to localStorage
function saveMoviesToLocalStorage(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
}

// Utility function to get movie data from localStorage
function getMoviesFromLocalStorage() {
    const movies = localStorage.getItem('movies');
    return movies ? JSON.parse(movies) : [];
}

// Function to render the movies stored in localStorage
function renderMovies() {
    const movies = getMoviesFromLocalStorage();
    container.innerHTML = '';  // Clear container before rendering

    movies.forEach(movie => {
        const div = document.createElement("div");
        div.setAttribute("class", "gameof");

        div.innerHTML = `
            <img class="gameofimage" src="${movie.imageURL}" alt="Movie Image">
            <h1 style="color: #fd6569;">${movie.name}</h1>
            <h3 class="reele">Released On:</h3>
            <h2 class="Yea">${movie.year}</h2>
            <h2 class="link12" onclick="window.open('${movie.link}', '_blank')" style="cursor: pointer;">watch</h2>
            <p style="padding: 5px;">${movie.review}</p>
            <h4 class="reviewwdby">Reviewed by:</h4>
            <h3 class="reviewname">${movie.reviewer}</h3><br>
            <h4 class="email1">Email:</h4>
            <h3 class="Emailid">${movie.email}</h3><br>
            <button class="delete-button" style="padding: 5px; margin: 10px; width: 80px; background-color: #fd6569; border-radius: 10px; cursor: pointer; border: none;" onclick="deleteMovie('${movie.name}')">Delete</button>
        `;
        container.append(div);
    });
}

// Add movie review function
function addmoive1() {
    if (moivename.value.trim() === "" || moivelink.value.trim() === "" || year1.value.trim() === "" || review.value.trim() === "" || yourname.value.trim() === "" || youremail.value.trim() === "") {
        alert("Please fill in all fields before adding a movie review.");
        return;
    }

    if (!imageURL) {
        alert("Please upload an image.");
        return;
    }

    // Create a new movie object
    const newMovie = {
        name: moivename.value,
        link: moivelink.value,
        year: year1.value,
        review: review.value,
        reviewer: yourname.value,
        email: youremail.value,
        imageURL: imageURL
    };

    // Get the current movie list from localStorage
    const movies = getMoviesFromLocalStorage();

    // Add the new movie to the array
    movies.push(newMovie);

    // Save the updated movie list back to localStorage
    saveMoviesToLocalStorage(movies);

    // Re-render the movies
    renderMovies();

    // Clear the popup form fields
    overley.style.display = "none";
    popup.style.display = "none";
    moivelink.value = "";
    moivename.value = "";
    year1.value = "";
    review.value = "";
    yourname.value = "";
    youremail.value = "";
    imageURL = "";  // Clear the image URL

    alert("Successfully added a movie review");
}

// Delete movie function
function deleteMovie(name) {
    const movies = getMoviesFromLocalStorage();
    const updatedMovies = movies.filter(movie => movie.name !== name);

    // Save the updated movie list to localStorage
    saveMoviesToLocalStorage(updatedMovies);

    // Re-render the movies
    renderMovies();
}

// Call renderMovies when the page loads to display stored movies
document.addEventListener('DOMContentLoaded', renderMovies);
