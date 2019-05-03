$(document).ready(function () {
    // Initial array of tv shows
    var topics = ["The Office", "Friends", "Seinfeld", "Parks and Recreation"];


    function renderButtons() {

        $('#buttons-view').empty();
        // Loop through the array of shows, then generate buttons for each show in the array
        for (i = 0; i < topics.length; i++) {
            var showName = $("<button>");
            // Adding a class
            showName.addClass("btn btn-success show");
            // Added a data-attribute
            showName.attr("data-name", topics[i]);
            // Provided the initial button text
            showName.text(topics[i]);
            // Added the button to the HTML
            $("#buttons-view").append(showName);
        }
    }

    $(document.body).on("click", ".show", function () {

        var tvShow = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            tvShow + "&api_key=21pbXpSdx68vgJpuoB7wb0uQgVGGuGUg&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                
                for (var i = 0; i < results.length; i++) {
                    
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var showImage = $("<img>");
                    showImage.addClass("gif-image column");
                    showImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(showImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });

    });




    // This function handles events where the add tv show button is clicked
    $("#add-show").on("click", function (event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // grabs the text the user types into the input field
        var userShow = $('#tv-input').val();
        topics.push(userShow);
        
        renderButtons();
        //clears the textbox after the user clicks the add show button
        $('#tv-input').val("");
    });

    // Calling the renderButtons function to display the initial list of tv shows
    renderButtons();
});