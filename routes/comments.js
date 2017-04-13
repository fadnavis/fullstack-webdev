var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});
        }
    });
});

router.get("/:comment_id/edit",middleware.checkCommentOwnhership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        res.render("comments/edit",{campground_id: req.params.id,comment:comment});
    });
});

router.post("/",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if(err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully created comment!");
                    res.redirect("/campgrounds/"+req.params.id)
                }
            });
        }
    });
});

router.put("/:comment_id",middleware.checkCommentOwnhership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            res.redirect("/campgrounds/"+req.params.id)
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnhership,function(req,res){
    
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    
    // Campground.findByIdAndRemove(req.params.id,function(err){
    //     if(err) {
    //         res.redirect("/campgrounds");
    //     } else {
    //         res.redirect("/campgrounds");
    //     }
    // });
});


module.exports = router;