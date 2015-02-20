(function($) {

    $(document).ready(function() {

    	var msnry = $('.masonry-wrap');

        msnry
        	.masonry({
	            columnWidth: ".masonry-width",
	            itemSelector: ".masonry-item"
	        });

       	$(window).load(function(e) {
            $(window).resize();
        });

        $(window).resize(function() {
            msnry.masonry();
        });
    });
})(jQuery);