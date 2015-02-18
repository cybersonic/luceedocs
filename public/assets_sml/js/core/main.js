(function($) {

    var isE8 = $("html").hasClass("lt-ie9");

    var LuceeJS = function() {

        var mobileMenuHandler = function() {
            $('.toggle-menu')
                .on('click', function(e) {

                    $('.main-navigation').stop().slideToggle();

                });

        }

        

        return {

            //main function to initiate scripts
            init: function() {

                mobileMenuHandler();
                

                if (isE8) {
                    // ie8Handler();
                }

            }
        };

    }();

    $(document).ready(function() {

        LuceeJS.init();

    });

})(jQuery);