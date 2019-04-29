// Array of shows
var shows = ["The Office", "Friends", "Seinfeld", "Parks and Recreation"];

// Generic function for capturing the movie name from the data-attribute
function alertShow() {

  // YOUR CODE GOES HERE!!!
  console.log($(this).attr('data-name'));
}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-container").empty();
  
  // Looping through the array of movies
  for (var i = 0; i < shows.length; i++) {
    
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var newButton = $("<button>");
    // Adding a class
    newButton.addClass("show");
    // Added a data-attribute
    newButton.attr("data-name", shows[i]);
    // Provided the initial button text
    newButton.text(shows[i]);
    
    // Added the button to the HTML
     $("#buttons-container").append(newButton);
     
  }
}

// This function handles events where one button is clicked
$("#add-show").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var show = $("#tv-input").val().trim();

  // The movie from the textbox is then added to our array
  shows.push(show);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".show", alertShow);

// Calling the renderButtons function to display the intial buttons
renderButtons();