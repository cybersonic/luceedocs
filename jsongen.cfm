<cfscript>
param name="url.exportPath" default="#expandPath("/export")#";

	sep = SERVER.separator.file;
	version=  SERVER.lucee.version;
	casings=deserializeJSON(fileRead('./export/casings.json'));	
	
	
	
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

	funclist = [];
	taglist = [];
	
	
	for(fun in getFunctionList()){
		//get our function data before we deal with casing
		fundata = getFunctionData(fun);
		//use our camel cased function name if it it exists for the remainder of our operations
		if(structKeyExists(casings.LCFunctionMap,fun)){
			fun=casings.LCFunctionMap[fun];
			fundata.name=fun;
		}
		funclist.append(fun);
		funcPath = FuncsPath & "#sep##fun#.json";
		//handle our CDATA tab characters after line breaks or our markdown is interpreted as a code block
		if(structKeyExists(fundata,'description'))
			fundata.description=replace(fundata.description,chr(9),'','all');
		fileWrite(funcPath,SerializeJSON(fundata));
	}
	arraySort(funclist, "textnocase", "ASC");

	FileWrite(JSONDocsPath & "#sep#functions.json", SerializeJSON(funclist));

	
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
		fileWrite(tagPath,SerializeJSON(tagData));
		
	}
	arraySort(taglist, "textnocase", "ASC");
	FileWrite(JSONDocsPath & "#sep#tags.json", SerializeJSON(taglist));



	FileWrite(JSONDocsPath & "#sep#version.json", SerializeJSON(versioninfo));
</cfscript>
