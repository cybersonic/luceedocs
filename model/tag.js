var fs = require('fs');
var util = require('util');

exports.list = function(version){
	var taglist =  JSON.parse(fs.readFileSync("./export/" + version + "/json/tags.json", "utf8"));
	return taglist;

}


exports.get = function(tag, version){

	var path = "./export/" + version + "/json/tags/" + tag + ".json";

	if (!fs.existsSync(path)) {
		return undefined;
	}

	var taglist =  JSON.parse(fs.readFileSync(path, "utf8"));
	return taglist;

}


exports.getByFilter = function(filter, value, version){

	//Now let's really see if this is true.
	var taglist = this.list(version);
	var results = taglist.map(function(item){
		var tagItem = JSON.parse(fs.readFileSync("./export/" + version + "/json/tags/" + item + ".json", "utf8"));

		if (tagItem[filter]){
			var unfitlered = {name: item};
			unfitlered[filter] = tagItem[filter];
			return unfitlered;
		}


	});


	return results;

}
/**
	I format the tagcode
*/
exports.toTagCode = function(tag){
		var tout = "";
		var tagName = tag.nameSpace + tag.nameSpaceSeperator + tag.name;
		if(tag.hasNameAppendix){
			tagName += "CustomName";
		}

		tout += "<" + tagName;


		var multipleAttrs = true;


		if(tag.attributeType == 'noname'){
				tout += " #";

				for(key in tag.attributes){
					tout += tag.attributes[key].type;
				}
				tout += " expression#";
				multipleAttrs = false;
		}
		else{
			//Sort the attributes by required (being the top ones)
			var attributeout = getAttributesAsString(tag);
			tout += attributeout.replace(/~~/g, "\n\t");
		}

		if(tag.attributeType == "dynamic" || tag.attributeType == "mixed"){
			tout += "\n\t...";
		}

		if(tag.bodyType == "prohibited"){
			tout += multipleAttrs?"\n>": ">";
		}
		else if(tag.bodyType == "free"){
			tout += ">";
			tout += "\n[</" + tagName + ">]";
		}
		else if(tag.bodyType == "required"){
			tout += "\n</" + tagName + ">";
		}

		return tout;
}

exports.toScriptCode = function(tag){
			var scriptout = "<cfscript>";
				scriptout += "\n\t" + tag.name;
			var multipleAttrs = true;

			if(tag.attributeType == 'noname'){
				scriptout += " #";

				for(key in tag.attributes){
					scriptout += tag.attributes[key].type;
				}
				scriptout += "expression#";
			}


			else if(tag.script && tag.script.type == "single"){
				scriptout += getAttributesAsString(tag).replace(/~~/g, "\n\t");
			}


			if(tag.attributeType == "dynamic" || tag.attributeType == "mixed"){
				scriptout += "...";
			}

			if(tag.getbodyType == "prohibited"){
				scriptout += ";";
			}

			else if (tag.bodyType == "required" || tag.bodyType == "free"){
				scriptout += "{}";
			}
			else {
				scriptout += " ;";
			}
			scriptout += "\n</cfscript>";
			return scriptout;
}

exports.toExampleCode = function(fun){
	var opts = {
		title: "",
		width: "100%",
		height: "150px",
		showOptions: true,
		showError: true,
		asserts: "",
		code: "",
		setupCode: "",
		showResults: true
	}
	var example = util._extend( opts, fun.example );
	example.code = Array.isArray( example.code ) ? example.code.join( '\n' ) : example.code;
	example.setupCode = Array.isArray( example.setupCode ) ? example.setupCode.join( '\n' ) : example.setupCode;

	return example || "";

}

exports.attributeTitles = function(){
	var ret = {}
	var type = {};
		type.noname = "This tag only allows one attribute value (no name).";
		type.mixed = "This tag has a fixed definition of attributes (see below). In addition it allows to use any additional attribute.";
		type.fixed = "The attributes for this tag are fixed. Except for the following attributes no other attributes are allowed.";
		type.dynamic = "There is no restriction for attributes for this tag.";

		var text = {};
		text.doc = {};
		text.doc.body = {};
		text.doc.body.free = "This tag may have a body.";
		text.doc.body.required = "This tag must have a body.";
		text.doc.attr = {};
		text.doc.attr.name = "Name";
		text.doc.attr.minmax = "This tag must have at least {min} attributes but the most {max}.";
		text.doc.attr.min = "This tag must have at least {min} attributes.";
		text.doc.attr._type = "Type";
		text.doc.attr.required = "Required";
		text.doc.attr.zero = "This tag has no attributes";
		text.doc.attr.type = {};
		text.doc.attr.type.noname = "This tag only allows one attribute value (no name).";
		text.doc.attr.type.mixed = "This tag has a fixed definition of attributes (see below). In addition it allowes to use any additional attribute.";
		text.doc.attr.type.fixed = "The attributes for this tag are fixed. Except for the following attributes no other attributes are allowed.";
		text.doc.attr.type.dynamic = "There is no restriction for attributes for this tag.";
		text.doc.attr.max = "Only the number of attributes is restricted to {max}.";
		text.doc.attr.description = "Description";
		text.doc.depAttr = "This Attribute is deprecated";

		ret.type = type;
		ret.text = text;

		return ret;
}
/*


	<span class="syntaxAttr">#tag.getname()#</span><!--
No Name
 --><cfif tag.getattributeType() EQ "noname"> <span class="syntaxAttr">##<cfloop array="#arrAttrNames#" index="key">#tag.getattributes()[key].type# <cfbreak></cfloop>expression##</span><!--

Single type
 --><cfelseif tag.getscript().type EQ "single"><span class="syntaxAttr"><cfloop array="#arrAttrNames#" index="key"><cfset ss=tag.getattributes()[key].scriptSupport><cfif ss NEQ "none"> <!--
 --><cfif ss EQ "optional">[</cfif>#tag.getattributes()[key].type#<cfif tag.getscript().rtexpr> expression</cfif><cfif ss EQ "optional">]</cfif><cfbreak></cfif></cfloop></span><!--


multiple
--><cfelse><cfloop array="#arrAttrNames#" index="key"><cfset attr=tag.getattributes()[key]><cfif attr.status EQ "hidden"><cfcontinue></cfif>
	<cfif not attr.required><span class="syntaxAttr">[</span></cfif><!--
	--><span class="syntaxAttr">#key#</span>=<span class="syntaxText">"<cfif not attr.required><i></cfif>#attr.type#<cfif not attr.required></i></cfif>"</span><!--
	--><cfif not attr.required><span class="syntaxAttr">]</span></cfif></cfloop></cfif><!--

--><cfif tag.getattributeType() EQ "dynamic" or tag.getattributeType() EQ "mixed"> <span class="syntaxAttr">...</span> </cfif><cfif tag.getbodyType() EQ "prohibited"><span class="syntaxAttr">;</span><cfelseif tag.getbodyType() EQ "required" or tag.getbodyType() EQ "free"><span class="syntaxAttr"> {}</span></cfif>


*/


getAttributesAsString = function(tag){
	var sortedAttributes =[];
	for(attrib in tag.attributes){
		var item = tag.attributes[attrib];
			item.name = attrib;
		sortedAttributes.push(item);
	}
	sortedAttributes.sort(function(a,b){
		if(a.required && !b.required ){
			return false;
		}
		return true;
	});


	var attributeout = "";

	for(attrib in sortedAttributes){

		var attribinfo = sortedAttributes[attrib];

		if(attribinfo.status == 'hidden'){
			continue;
		}

		attributeout += "~~";
		attributeout += attribinfo.required? "" : "[";
		attributeout += attribinfo.name + "=\"" + attribinfo.type +"\"" ;
		attributeout += attribinfo.required? "" : "]";
	}
	return attributeout;
}