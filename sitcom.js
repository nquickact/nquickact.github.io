//Nathan Quick's code

//making our initial array for sitcoms
var sitcoms = ["Seinfeld", "Friends", "How I Met Your Mother", "Scrubs", "Cheers", "Arrested Development"];

// displaySitcomInfo function re-renders the HTML to display the appropriate content
function displaySitcomInfo() {

	var sitcom = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ sitcom + "&api_key=28baa5e8554542f1883f3ac12fe87e38&limit=10"

	 $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          	var results = response.data;
           	// Looping through each result item
          	for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var sitcomDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var sitcomImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            sitcomImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the sitcomDiv
            sitcomDiv.append(p);
            sitcomDiv.append(sitcomImage);

            // Prependng the animalDiv to the HTML page in the "#sitcom" div
            $("#sitcom").prepend(sitcomDiv);
          }

        });

      }
//Sample code from which to apply on-click state changes

 // $("#sitcom").on("click", function() {
 //      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
 //      var state = $(this).attr("data-state");
 //      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
 //      // Then, set the image's data-state to animate
 //      // Else set src to the data-still value
 //      if (state === "still") {
 //        $(this).attr("src", $(this).attr("data-animate"));
 //        $(this).attr("data-state", "animate");
 //      } else {
 //        $(this).attr("src", $(this).attr("data-still"));
 //        $(this).attr("data-state", "still");
 //      }
 //    });



 // Function for displaying sitcom data
      function renderButtons() {

        // Deletes the sitcoms prior to adding new sitcoms
        // (this is necessary otherwise you will have repeat buttons)
        $("#sitcomButtons").empty();
        // Loops through the array of sitcoms
        for (var i = 0; i < sitcoms.length; i++) {

          // Then dynamicaly generates buttons for each sitcom in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of sitcom to the button
          a.addClass("sitcom");
          // Added a data-attribute
          a.attr("data-name", sitcoms[i]);
          // Provided the initial button text
          a.text(sitcoms[i]);
          // Added the button to the sitcomButtons div
          $("#sitcomButtons").append(a);
        }
      }

      // This function handles events where the add sitcom button is clicked
      $("#add-sitcom").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var sitcom = $("#sitcom-input").val().trim();

        // The movie from the textbox is then added to the array
        sitcoms.push(sitcom);

        // Calling renderButtons which handles the processing of the sitcom array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".sitcom", displaySitcomInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


