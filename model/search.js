/**
 * Created by markdrew on 07/12/14.
 */
var tags = require('../model/tag.js');
var functions = require('../model/function.js');

var version = require('../model/version.js');


var indexeditems = [];

//Main search function
exports.find = function(term){

        if(!term || !term.length){
            return [];
        }


        if(!indexeditems.length){

            this.index();
        }
        var results = []
        indexeditems.forEach(function(item){
            if(item.search(term.toLowerCase()) >= 0){

                results.push(item);
            }
        });

    return results;
}


exports.index = function(){

        var versionString = version.current();
        var tagList = tags.list(versionString);
        var funcList = functions.list(versionString);
        var objList = functions.listObjects(versionString);


        tagList.forEach(function(item){
            indexeditems.push(item.toLowerCase());

        });
        funcList.forEach(function(item){
            indexeditems.push(item.toLowerCase());
        });


        for(var type in objList){


            for(var mf in objList[type]){
                indexeditems.push(type + "." + mf + "()");
            }

        }

        //Now get the memberFunctions.

}