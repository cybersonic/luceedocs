<cfscript>
param name="url.exportPath" default="#expandPath("../../../export")#";

	sep = SERVER.separator.file;
	version= SERVER.lucee.version;


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

		funclist.append(fun);
		fundata = getFunctionData(fun);
		funcPath = FuncsPath & "#sep##fun#.json";
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
		fileWrite(tagPath,SerializeJSON(tagData));
	}
	arraySort(taglist, "textnocase", "ASC");
	FileWrite(JSONDocsPath & "#sep#tags.json", SerializeJSON(taglist));

	//Finally Write the Version information json
	versioninfo = Duplicate(SERVER.lucee);

	//Remove system info
	StructDelete(versioninfo, 'loaderPath');

	FileWrite(JSONDocsPath & "#sep#version.json", SerializeJSON(versioninfo));
</cfscript>