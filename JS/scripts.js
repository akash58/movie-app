$(document).ready(function(){
  // The base url for all API calls
  var apiBaseURL = 'http://api.themoviedb.org/3/';

  // URL in Authentication. Base URL of image
  var imageBaseUrl = 'https://image.tmdb.org/t/p/';

  var apiKey = '3356865d41894a2fa9bfa84b2b5f59bb';

  const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

  function getNowPlayingData(){
    $.getJSON(nowPlayingURL, function(nowPlayingData){
      for(let i = 0; i<nowPlayingData.results.length; i++){
        var mid = nowPlayingData.results[i].id;
        var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;

        $.getJSON(thisMovieUrl, function(movieKey){

          var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;

          var title = nowPlayingData.results[i].original_title;

          var releaseDate = nowPlayingData.results[i].release_date;

          var overview = nowPlayingData.results[i].overview;

          var voteAverage = nowPlayingData.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;

          var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;

          var nowPlayingHTML = '';
          nowPlayingHTML += '<div class="col-sm-3 eachMovie mydivouter">';
            nowPlayingHTML += '<button type="button" class="btnModal">'+'<img src="'+poster+'"></button>';
            nowPlayingHTML += '<div class="overlay"></div>'
            nowPlayingHTML += '<input type="button" class="mybuttonoverlap btn btn-info" value="ADD" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '" />'
            nowPlayingHTML += '<div class="cf mb35"><div class="cblack fl truncate">'+title+'</div><div class="cblack fr">'+releaseDate+'</div></div>';
            nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
              nowPlayingHTML += '<div class="modal-dialog" role="document">';
                nowPlayingHTML += '<div class="modal-content col-sm-12">';
                  nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
                    nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
                  nowPlayingHTML += '</div><br>';//close trailerLink
                  nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
                    nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
                    nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';  
                    nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
                    nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';
                    nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:30 AM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:00 AM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">12:30 PM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
                    nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
                  nowPlayingHTML += '</div>';
                nowPlayingHTML += '</div>';
              nowPlayingHTML += '</div>';
            nowPlayingHTML += '</div>';
          nowPlayingHTML += '</div>';

          $('#movie-grid').append(nowPlayingHTML);
          $('#movieGenreLabel').html("Now Playing");
        })
      }
    }) 
  }

  getNowPlayingData();

  var nowPlayingHTML = '';
  var genreHTML = '';

  $('.navbar-brand').click(function(){
    getNowPlayingData();
    $('#movie-grid').html(nowPlayingHTML);
    $('#movieGenreLabel').html("Now Playing");
  })    
  $('.nowPlaying').click(function(){
    getNowPlayingData();
    $('#movie-grid').html(nowPlayingHTML);
    $('#movieGenreLabel').html("Now Playing");
  })

  /* Search function */
  var searchTerm = '';
  searchMovies();
  $('.searchForm').submit(function(event){
    $('#movie-grid').html('');
    event.preventDefault();
    searchTerm = $('.form-search').val();
    searchMovies();
  })

  function searchMovies(){
    const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
    $.getJSON(searchMovieURL, function(movieSearchResults){
      for (let i = 0; i<movieSearchResults.results.length; i++){
        var mid = movieSearchResults.results[i].id;
        var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;   

        $.getJSON(thisMovieUrl, function(movieKey){
          var poster = imageBaseUrl+'w300'+movieSearchResults.results[i].poster_path;
          var title = movieSearchResults.results[i].original_title;
          var releaseDate = movieSearchResults.results[i].release_date;
          var overview = movieSearchResults.results[i].overview;
          var voteAverage = movieSearchResults.results[i].vote_average;       
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
          var searchResultsHTML = '';
          searchResultsHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
            searchResultsHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>';  
            searchResultsHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
              searchResultsHTML += '<div class="modal-dialog" role="document">';
                searchResultsHTML += '<div class="modal-content col-sm-12 col-lg-12">';
                  searchResultsHTML += '<div class="col-sm-6 moviePosterInModal">';
                    searchResultsHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
                  searchResultsHTML += '</div><br>';
                  searchResultsHTML += '<div class="col-sm-6 movieDetails">';
                    searchResultsHTML += '<div class="movieName">'+title+'</div><br>';
                    searchResultsHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>'; 
                    searchResultsHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
                    searchResultsHTML += '<div class="overview">' +overview+ '</div><br>';
                    searchResultsHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">8:30 AM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">10:00 AM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">12:30 PM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
                    searchResultsHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
                  searchResultsHTML += '</div>';
              searchResultsHTML += '</div>';
            searchResultsHTML += '</div>';
          searchResultsHTML += '</div>';
          $('#movie-grid').append(searchResultsHTML);
          $('#movieGenreLabel').html(searchTerm); 
        })
      }
    })
  }
});
