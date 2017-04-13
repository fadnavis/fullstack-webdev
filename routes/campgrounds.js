var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW 
router.get("/:id",function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err) {
            console.log("could not find the requested campground");
            console.log(err);
            res.send("Could not find the requested campground");
        } else {
            res.render("campgrounds/show",{campground: campground});
        }
    });
});

router.get("/:id/edit",middleware.checkCampgroundOwnhership,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err) {
            req.flash("error","Some error occurred! Try again");
        } else {
            res.render("campgrounds/edit",{campground:campground});
        }
    });
    
})

router.put("/:id",middleware.checkCampgroundOwnhership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            console.log("ENTERING AFTER SUCCESSFUL UPDATE");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkCampgroundOwnhership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

router.post("/",middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    Campground.create({
        name: name,
        image: image,
        author: {id: req.user._id,username: req.user.username},
        description: description
    },function(err,campground){
        if(err) {
            console.log("Error creating campground");
            console.log(err);
        } else {
            console.log("Campground created!!");
            console.log(campground);
        }
    });
    
    //campgrounds.push({name: name, image: image});
    //redirect to view all campgrounds
    res.redirect("/campgrounds");
});

router.get("/",function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err) {
            res.send("ERROR fetching campgrounds!!");
        } else {
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});


module.exports = router;