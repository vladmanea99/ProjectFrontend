const express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();
//const bodyParser = require('body-parser');
const session = require('express-session')	
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require("nodemailer");
singleton = false;
const crypto = require('crypto');

// initializari socket.io
const http=require('http')

app.use('/resources', express.static('C:/Users/Vlad/Desktop/github/ProjectFrontend' + '/resources'));

app.use(session({
	secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
	resave: true,
	saveUninitialized: false
  }));

function getJson(numeFis){
	let textFis = fs.readFileSync(numeFis);//pun continutul fisierului useri.json in rawdata
	return JSON.parse(textFis);//obtin obiectul asociat json-ului
}

function saveJson(obJson, numeFis){
	let data = JSON.stringify(obJson);//transform in JSON
	fs.writeFileSync(numeFis, data);//scriu JSON-ul in fisier (inlocuind datele vechi)
}

app.get('/mainPage', function(req, res){
	let rawdata = fs.readFileSync('courses.json');
	let jsfis = JSON.parse(rawdata);
	console.log(jsfis.courses);
	if(!singleton || req.session.user == null){
		res.render('html/loginPage');
	}
	res.render('html/mainPage',{courses:jsfis.Course});
});

app.get('/registerPage', function(req, res){
	res.render('html/registerPage');
})


app.get('/loginPage', function(req, res){
	res.render('html/loginPage');
})

app.get('/userPage', function(req, res){
	if (req.session.user.id == 1){
		var coursesJson = getJson("courses.json");
		res.render('html/adminPage', {courses:coursesJson.Course});
	}
	else{
		res.render('html/userPage');
	}
	
})

app.get('/adminPage', function(req, res){
	
	if(!singleton || req.session.user == null){
		res.redirect('/loginPage');
	}
	else if (req.session.user.id == 1){
		var coursesJson = getJson("courses.json");
		res.render('html/adminPage', {courses:coursesJson.Course});
	}
	else{
		res.render('html/errorPage');
	}
})

app.get("/", function (req, res){
	if (!singleton){
		req.session.user = null;
		singleton = true;
	}
	if (req.session.user == null){
		res.redirect("/loginPage");	
	}
	else{
		if (req.session.user.id == 1){
			var coursesJson = getJson("courses.json");
			res.redirect("/adminPage", {courses:coursesJson.Course});
		}
		else{
			res.redirect("/userPage", {user:req.session.user});
		}
		
	}
	
});
/*
app.get("/*", function (req, res){
	res.render("html" + req.path);
});
*/

app.post('/loginPage', function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		
		var usersJson = getJson("users.json");
		let user = usersJson.Users.find(function(x){
			return (x.email == fields.email && x.password == fields.password);
		})
		console.log(user);
		
		if (user){
			req.session.user = user;
			if (user.id == 1){
				var coursesJson = getJson("courses.json");
				res.render('html/adminPage', {courses:coursesJson.Course});
			}
			else {
				res.render('html/userPage', {user:user});
			}
			
		}
		else{
			req.session.user = null;
			res.redirect('/loginPage');
		}
		
	})
})


app.get('/logout', function(req, res) {	
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
	res.redirect('/loginPage');	
});


app.post('/registerPage', function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		
		
		var usersJson = getJson("users.json");
		//TODO FA VERIFICARILE

		let user = usersJson.Users.find(function(x){
			return (x.email == fields.email);
		})
		if (!user){
		usersJson.Users.push({id:usersJson.Users.length +1, 
			firstName:fields.first_name, 
			lastName:fields.last_name,  
			email:fields.email, 
			password:fields.password,  
			currentCourses:[],
			pastCourses:[]});
		}
			saveJson(usersJson, "users.json");	
		
		res.render("html/loginPage");
	
	})
	
})

app.set('view engine', 'ejs');
app.listen(8080);
console.log("Am pornit!");


