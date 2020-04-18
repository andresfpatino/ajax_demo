( function ( $ ) {

	$( '#search-movie' ).keyup( function () {
		var query = $( this ).val();

		if ( query.length > 2 ) {

			$.ajax( {
				method: 'post',
				url: movies.adminAjax,
				data: {
					action: 'findMovie',
					query: query
				},
				beforeSend: function () {

					if ( $( '#movie-finder .search-results' ).length ) {
						$( '#movie-finder .search-results' ).html( '<p>Buscando Películas</p>' );
					}
					else {
						$( '#movie-finder' ).append( '<div class="search-results"><p>Buscando Películas</p></div>' );
					}
				},
				success: function ( movies ) {
					var $wrapper = $( '#movie-finder .search-results' );

					if ( movies.length ) {
						var moviesMArkup = searchResultsMarkup( movies );
						$wrapper.html( moviesMArkup );
					}
					else {
						$wrapper.html( '<p>No se encontraron películas</p>' );
					}
				}
			} );
		}
	} );

	function searchResultsMarkup( movies ) {
		var markup = '';

		movies.forEach( function ( movie ) {
			markup += '<div class="movie-wrapper">';
			markup += '		<div class="image">';
			markup += '			<a href="' + movie.link + '"><img src="' + movie.image + '"></a>';
			markup += '		</div>';
			markup += '		<div class="content">';
			markup += '			<h4><a href="' + movie.link + '">' + movie.title + '</a></h4>';
			markup += '		</div>';
			markup += '</div>';
		} );

		return markup;
	}
} )( jQuery );