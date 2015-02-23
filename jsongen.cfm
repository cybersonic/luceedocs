<cfscript>
param name="url.exportPath" default="#expandPath("/export")#";

	sep = SERVER.separator.file;
	version=  SERVER.lucee.version;
	xml_funlib=xmlParse('https://bitbucket.org/lucee/lucee/raw/dc1337abc3592eb16b59cb8c93e1bb7083e9d395/lucee-java/lucee-core/src/resource/fld/web-cfmfunctionlibrary_1_0')['func-lib'];




	versioninfo = {
		'loaderVersion' : SERVER.lucee.loaderVersion,
		'release-date' : SERVER.lucee['release-date'],
		'state' : SERVER.lucee.state,
		'version' : SERVER.lucee.version,
		'versionName' : SERVER.lucee.versionName,
		'versionNameExplanation' : SERVER.lucee.versionNameExplanation,

	}


	ExportPath = "#url.exportPath##sep##version#";
	JSONDocsPath = ExportPath & "#sep#json";
	TagsPath = JSONDocsPath & "#sep#tags";
	FuncsPath = JSONDocsPath & "#sep#functions";


	//Clean it first



	checkPath(JSONDocsPath);
	checkPath(TagsPath);
	checkPath(FuncsPath);

	function checkPath(path){
		if(!directoryExists(path)){
			directoryCreate(path);
		}
		directoryClear(path);
	}


	function DirectoryClear(path){
		var items =directoryList(path, false, "query");

		for(item in items){
			if(item.type IS "File"){
				var itemPath= item.directory & sep & item.name;
				fileDelete(itemPath);
			}

		}

	}

	/**
	 * The following function has been taken and adapted from Ketan Jetty's work
	 * found here: http://ketanjetty.com/coldfusion/javascript/format-json/
	 *
	 */
	function serializeJsonPretty( val ) {
	    var str       = SerializeJson( val );
	    var retval    = '';
	    var pos       = 0;
	    var strLen    = str.len();
	    var indentStr = '  ';
	    var newLine   = Chr( 10 );
	    var char      = '';

	    for( var i=0; i<strLen; i++ ){
	        char = str.substring( i, i+1 );

	        if ( char == '}' || char == ']' ) {
	            retval = retval & newLine;
	            pos = pos - 1;

	            for ( var j=0; j<pos; j++ ) {
	                retval = retval & indentStr;
	            }
	        }

	        retval = retval & char;

	        if (char == '{' || char == '[' || char == ',') {
	            retval = retval & newLine;

	            if (char == '{' || char == '[') {
	                pos = pos + 1;
	            }

	            for (var k=0; k<pos; k++) {
	                retval = retval & indentStr;
	            }
	        }
	    }

	    return retval;
	};

	funclist = [];
	taglist = [];


	for(fun in getFunctionList()){
		xml_fun=xmlSearch(xml_funlib,"./function[translate(name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz') = '#fun#']");
		//get our function data before we deal with casing
		fundata = getFunctionData(fun);
		//use our camel cased function name if it it exists for the remainder of our operations
		if(arrayLen(xml_fun)){
			fun=xml_fun[1].name.xmlText;
			//lowercase our first letter for consistency
			fun=replace(fun,left(fun,1),lcase(left(fun,1)),'one');
			fundata.name=fun;
		}
		funclist.append(fun);
		funcPath = FuncsPath & "#sep##fun#.json";
		//handle our CDATA tab characters after line breaks or our markdown is interpreted as a code block
		if(structKeyExists(fundata,'description'))
			fundata.description=replace(fundata.description,chr(9),'','all');
		fileWrite(funcPath,serializeJsonPretty(fundata));
	}
	arraySort(funclist, "textnocase", "ASC");

	FileWrite(JSONDocsPath & "#sep#functions.json", serializeJsonPretty(funclist));


	ignorelist = "_";

	for(tag in getTagList().cf){

		if(listFindNoCase(ignorelist, tag)){
			continue;
		}

		taglist.append("cf" & tag);
		tagData = getTagData("cf", tag);
		tagPath = TagsPath & "#sep#cf#tag#.json";
		if(structKeyExists(tagData,'description'))
			tagData.description=replace(fundata.description,chr(9),'','all');
		fileWrite(tagPath,serializeJsonPretty(tagData));

	}
	arraySort(taglist, "textnocase", "ASC");
	FileWrite(JSONDocsPath & "#sep#tags.json", serializeJsonPretty(taglist));



	FileWrite(JSONDocsPath & "#sep#version.json", serializeJsonPretty(versioninfo));
</cfscript>
