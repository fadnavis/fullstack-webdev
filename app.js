var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var flash = require("connect-flash");

var campgroundRoutes = require("./routes/campgrounds");
var commentsRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");

//seedDB();
app.use(methodOverride("_method"));
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is a secret string",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(function(req,res,next){
    res.locals.currentuser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Yelpcamp has started listening!");
});