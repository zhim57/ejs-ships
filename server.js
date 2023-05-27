
const dotenv = require('dotenv');
var express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");


var PORT = process.env.PORT || 8085;
dotenv.config({path: './.env'})

var app = express();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_LOCAL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('views', path.join(__dirname,"views"));


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set ejs.
app.set("view engine", "ejs");

// Import routes and give the server access to them.
const routes = require("./routes/routes.js")



app.use(routes);

app.use(session({
  secret: "nodejs",
  resave:true,
  saveUninitialized:true
}));
app.use(flash());
 
app.use((req,res, next) => { 
  res.locals.success_msg = req.flash(("success_msg")),
  res.locals.error_msg = req.flash(("error_msg")),
  next()
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
