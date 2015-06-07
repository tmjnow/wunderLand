// PART 1: SHOW Book results

function getBookResults(evt) {
  evt.preventDefault();
  $('#results-div').empty();
  $('#book-result-div').empty();


  var url = "/search?" + $('#user_book_query').serialize();

  $.get(url, function(json) { 


    $("#results-div").append("<div class='container'><p>Found " + json.name.length + " books associated with " + $("#search-input").val() + ".</p></div>"); 
    $('.results-tabs').addClass('show');
    for (var book=0; book <json.name.length; book++) {
     
      $("#book-result-div").append('<div class="col-md-3"><a data-toggle="modal" data-target="#myModal" href="#"><img id="' +
        json.name[book].isbn + '" class="book-thumbnail" data-title="' +
         json.name[book].title + '" data-keywords="' + 
         json.name[book].keywords + '" data-subtitle="' + 
         json.name[book].subtitle + '" data-thumbnail="' + 
         json.name[book].thumbnailUrl + '" data-description="' + 
         json.name[book].description +'" data-author="' + 
         json.name[book].authors + '" src="' + 
         json.name[book].thumbnailUrl + '"></a></div>'
      );   
    }

    $(".book-thumbnail").click(function() {
      
      $('.book-title').empty();
      $('.book-keywords').empty();
      $('.book-subtitle').empty();
      $('.book-author').empty();
      $('.book-thumbnailUrl').empty();
      $('.book-description').empty();

      var keywords = ($(this).data("keywords")).split(",");
      for (var word=0; word<keywords.length; word++) {
        // var keywordUrl = "/keyword/" + $(keyword[word]).serialize.();
        $(".book-keywords").append('<button type="button" class="btn btn-success btn-xs tester keywordbutton" data-key="' +
          keywords[word] + '">' + keywords[word] + "</button>" + " ")
   
      }
      $(".book-title").append($(this).data("title"));
      $('.book-subtitle').append($(this).data('subtitle'));
      $('.book-author').append($(this).data('author'));
      $('.book-description').append($(this).data('description'));
      $('.book-thumbnailUrl').append("<img class='modal-cover' src='" + ($(this).data('thumbnail')) + "'>");

    }); 
    
  });
}

// The end of getBookResults //



// Part 2: Get Keyword Associated Books
 

$(document).on('click', '.keywordbutton', function() {
  $('#results-div').empty();
  $('#book-result-div').empty();

  console.log("helelloeoeoeoooo")
  var keyword = $(this).data('key');
  var url = "/keyword?keyword=" + keyword
  
  console.log(keyword)
  console.log(url)

  $.get(url, function(json) {

    // evt.preventDefault();
    // $('#results-div').empty();
    // $('#book-result-div').empty();

    $("#results-div").append("<div class='container'><p>Found " + json.keywordbooks.length + 
    " books associated with " + keyword + ".</p></div>"); 

    $('.results-tabs').addClass('show');

    for (var book=0; book <json.keywordbooks.length; book++) {
     
      $("#book-result-div").append('<div class="col-md-3"><a data-toggle="modal" data-target="#myModal" href="#"><img id="' +
        json.keywordbooks[book].isbn + '" class="book-thumbnail" data-title="' +
         json.keywordbooks[book].title + '" data-keywords="' + 
         json.keywordbooks[book].keywords + '" data-subtitle="' + 
         json.keywordbooks[book].subtitle + '" data-thumbnail="' + 
         json.keywordbooks[book].thumbnailUrl + '" data-description="' + 
         json.keywordbooks[book].description +'" data-author="' + 
         json.keywordbooks[book].authors + '" src="' + 
         json.keywordbooks[book].thumbnailUrl + '"></a></div>'
      );   // append closer

      $(".book-thumbnail").click(function() {
      
      $('.book-title').empty();
      $('.book-keywords').empty();
      $('.book-subtitle').empty();
      $('.book-author').empty();
      $('.book-thumbnailUrl').empty();
      $('.book-description').empty();

      var keywords = ($(this).data("keywords")).split(",");
      for (var word=0; word<keywords.length; word++) {
        // var keywordUrl = "/keyword/" + $(keyword[word]).serialize.();
        $(".book-keywords").append('<button type="button" class="btn btn-success btn-xs tester keywordbutton" data-key="' +
          keywords[word] + '">' + keywords[word] + "</button>" + " ")
   
      }
      $(".book-title").append($(this).data("title"));
      $('.book-subtitle').append($(this).data('subtitle'));
      $('.book-author').append($(this).data('author'));
      $('.book-description').append($(this).data('description'));
      $('.book-thumbnailUrl').append("<img class='modal-cover' src='" + ($(this).data('thumbnail')) + "'>");

      }); // modals book-thumbnail 
    } // for loop closing
  }); // get request closer
});  // bookthumbnail click closer
// }    // outermost bracket




// Par 3: Geolocation

function showPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
                document.getElementById("result").innerHTML = positionInfo;
            });
        } else{
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }


function getModalInfoForEachBook(evt) {
  console.log("something there")
  $('.book-title').empty();
  $('.book-keywords').empty();

  var url='/search?' + $('#user_book_query').serialize();

  $.get(url, function(json) {
    console.log(json)
  })
}


function getKMeansResults(evt) {
  evt.preventDefault();
  $('#results-div').empty();
  $('#book-result-div').empty();
  $('#kmeans_graph').empty();    

  var url = "/search/kmeans?" + $('#user_book_query').serialize();

  $.get(url, function(json) { 
    $("#kmeans_graph").append(json.kmeans); 
  });
}


$(document).ready(function () {
  $('#user_book_query').on('submit', getBookResults);
  $('#user_book_query').on('submit', getKMeansResults)
  $('#books').tab('show')

  $('#myTab a:first').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  $('#myTab a:last').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  // The timer for the loading screen - starts 1000 ms after call
  $(document).ajaxStart(function () {
      timer = setTimeout(function () {
        $("#loaderthingy").show();
      }, 1000);
  });

  $(document).ajaxComplete(function () {
      $("#loaderthingy").hide();
      clearTimeout(timer);
  });

  // $('.keyword').on('click', getKeywordBooks);
  // $(document).on('click', '.keywordbutton', function(event) {
  //   alert("hello");

  // });

  // $('.keywordbutton').on('click', function() {
  //   console.log('anybody here')
  // })
  $('.tester').on('click', function() {
  console.log("what'sup");
});
  // $($(this).data('key')).on('click', function() {
  //   console.log('hi')
  // });

})


