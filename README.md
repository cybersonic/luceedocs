#LuceeDocs Server
This application is used to power railodocs.org (soon! soon!). It essentially formats json files that define the documentation for tags and functions that are produced by Lucee server ( http://www.getrailo.org/ ). 

##Installation
You will need node (http://nodejs.org/) and npm (https://www.npmjs.com/) on your machine to run the local site. You will also need a copy of Lucee ( http://www.getrailo.org/ ) to generate new versions of the documentaiton. 	

	git clone https://github.com/cybersonic/luceedocs

	cd luceedocs

	npm install 

##Running
To run the application locally you should do 
		
	node app.js

Then you can hit the site at http://localhost:3000

## Generating docs	
If you want to generate a new version of Lucee's documentation, we have included a script that you can run at:
	
https://github.com/cybersonic/railodocs/blob/master/jsongen.cfm

Just run this and it should generate the documentation in a folder called export (at the moment this is configurable by a url variable called exportPath when you call the script. ) So for example, if you have railo running you can do:

http://localhost:8888/jsongen.cfm?exportPath=/Users/markdrew/Sites/railodocs/export 

(as an example)


## Submitting your docs 
If you are all ready to submit the new version of Lucee docs or fix a bug or even (joy of joys!) contribute you can fork the project in github and add the exported folder, make sure it works and ask for a pull request. 


## License
I am still thinking about which license the documentation viewer should be under. TBD
