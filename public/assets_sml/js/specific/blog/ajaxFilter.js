( function( $ ){

	if ( typeof cfrequest.loadMoreEndpoint === "undefined" ) {
		return;
	}

	var $resultsContainer = $( "#blog-listing" ).first()
	  , blogFilterEndpoint = cfrequest.loadMoreEndpoint
	  , $linkViewMore = $("#link-view-more")
	  , iPage = 1
	  , totalRecord = $linkViewMore.data('total-record')
	  , fetchBlogPosts;

	fetchBlogPosts = function( oLoadMoreLink ) {
		$.ajax( blogFilterEndpoint, {
			  method  : "POST"
			, cache   : false
			, data    : { page: parseInt(iPage) }			
		} ).done(function(response) {
			$resultsContainer.append( response );
			var loadedPage = parseInt(iPage)+1;
			var totalItemLoaded = $resultsContainer.find('.post-item').size();
			if ( totalItemLoaded >= totalRecord ){
				oLoadMoreLink.parent().remove();
			} else {
				oLoadMoreLink.attr('data-page',parseInt( loadedPage ) );
			}
        }).fail(function() {
        	alert('Connection failed, please try again later');
        	return false;
        });
	};

	$( "#col-blog-listing" ).on( "click", "#link-view-more", function(){

		$resultsContainer    = $(this).parent().prev('.listing');
		blogFilterEndpoint   = $(this).attr('href');
		iPage                = $(this).attr('data-page');

		fetchBlogPosts( $(this) );
		return false;
	} );

	fetchBlogPosts( $linkViewMore );

} )( jQuery );