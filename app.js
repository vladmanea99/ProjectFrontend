const express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();
//const bodyParser = require('body-parser');
const session = require('express-session')
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require("nodemailer");

const crypto = require('crypto');

// initializari socket.io
const http=require('http')

app.use('/resources', express.static('C:/Users/Vlad/Desktop/github/ProjectFrontend' + '/resources'));


app.get('/mainPage', function(req,res){
	let rawdata = fs.readFileSync('courses.json');
	let jsfis = JSON.parse(rawdata);
	console.log(jsfis.courses);
	res.render('html/mainPage',{courses:jsfis.Course});
});

app.get("/", function (req, res){
	res.render("html/mainPage");
});

app.get("/*", function (req, res){
	res.render("html" + req.path);
});

app.set('view engine', 'ejs');
app.listen(8080);
console.log("Am pornit!");


