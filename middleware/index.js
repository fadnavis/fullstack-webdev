var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObject = {};

middlewareObject.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()) {
        return next();
    } 
    req.flash("error","You need to be logged in first!");
    res.redirect("/login");
}

middlewareObject.checkCampgroundOwnhership = function(req,res,next) {
    //is user loggedin
    if(req.isAuthenticated()) {
        //does user own the campground
        Campground.findById(req.params.id,function(err,campground){
            if(err) {
                req.flash("error","Some error occurred! Try again");
                res.redirect("back");
            } else {
                if(campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You cannot edit the campground created by someone else!");
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("You need to be logged in");
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
}


middlewareObject.checkCommentOwnhership = function(req,res,next) {
    //is user loggedin
    if(req.isAuthenticated()) {
        //does user own the campground
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err) {
                req.flash("error","Some error occurred! Try again");
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You cannot edit the comment written by someone else!");
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("You need to be logged in");
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports = middlewareObject;