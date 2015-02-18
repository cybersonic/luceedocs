component output=false {

	public void function configure( bundle ) output=false {
		// See sticker docs here: http://sticker.readthedocs.org/en/latest/
		bundle.addAsset( id="jq-jquery"          , path="/js/lib/jquery-1.10.1.min.js"      );
		bundle.addAsset( id="jq-bootstrap"       , path="/js/lib/bootstrap.min.js"          );
		// bundle.addAsset( id="jq-tooltipster" 	 , path="/js/lib/jquery.tooltipster.min.js" );
		// bundle.addAsset( id="jq-bxslider"        , path="/js/lib/jquery.bxslider.min.js"    );
		// bundle.addAsset( id="jq-scrollbar"       , path="/js/lib/perfect-scrollbar.min.js"  );
		bundle.addAsset( id="jq-masonry-pkgd" 	 , path="/js/lib/masonry.pkgd.min.js"   		);
		bundle.addAsset( id="jq-masonry" 		 , path="/js/specific/masonry/masonry.js"   		);
		bundle.addAsset( id="js-smooth-scroll" 	 , path="/js/lib/SmoothScroll.js"   		);
		bundle.addAsset( id="js-modernizr"       , path="/js/lib/modernizr-2.6.2.min.js"    );
		bundle.addAsset( id="js-respond"         , path="/js/lib/respond.js"                );

		bundle.addAsset( id="css-bootstrap"  	 , path="/css/lib/bootstrap.min.css" 		);
		// bundle.addAsset( id="css-tooltipster"	 , path="/css/lib/tooltipster.css"   		);
		// bundle.addAsset( id="css-bxslider"       , path="/css/lib/jquery.bxslider.css"		);
		// bundle.addAsset( id="css-scrollbar"      , path="/css/lib/perfect-scrollbar.min.css");
		bundle.addAsset( id="css-ie8"        	 , path="/css/lib/ie8.css"           		);

		
		bundle.addAsset( id="css-googlesansfont" , url="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800", type="css" );

		bundle.addAssets(
			  directory   = "/js/"
			, match       = function( path ){ return ReFindNoCase( "_[0-9a-f]{8}\..*?\.min.js$", arguments.path ); }
			, idGenerator = function( path ) {
				return ListDeleteAt( path, ListLen( path, "/" ), "/" ) & "/";
			}
		);
		bundle.addAssets(
			  directory   = "/css/"
			, match       = function( path ){ return ReFindNoCase( "_[0-9a-f]{8}\..*?\.min.css$", arguments.path ); }
			, idGenerator = function( path ) {
				return ListDeleteAt( path, ListLen( path, "/" ), "/" ) & "/";
			}
		);

		bundle.asset( "jq-jquery" ).dependents( "jq-*" );
		bundle.asset( "js-respond" ).setIE( "lte IE 8" );
		bundle.asset( "/js/core/" ).dependsOn( "jq-*" );
		bundle.asset( "jq-masonry-pkgd" ).dependents( "jq-masonry" );

		bundle.asset( "css-bootstrap" ).before( "*" );
		bundle.asset( "/css/core/" ).after( "*" ).dependents( "/css/specific/*" );
		bundle.asset( "css-ie8" ).setIE( "lte IE 8" );
	}
}