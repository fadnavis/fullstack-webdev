var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data  = [
        {name:"Salmon's Creek",image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg", description: "Bacon ipsum dolor amet venison jowl andouille shoulder drumstick salami tongue, ground round picanha. Ham picanha chuck doner pancetta kevin meatloaf turducken. Bresaola pork chop tri-tip landjaeger rump hamburger pork belly corned beef bacon fatback drumstick pork. Porchetta corned beef ground round, ham hock hamburger tri-tip bacon brisket t-bone shankle jerky pancetta shoulder beef kielbasa. Beef ribs salami pork meatball tail hamburger cupim alcatra swine corned beef pork chop leberkas."},
        {name:"Watery Salburg", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg", description: "Bacon ipsum dolor amet venison jowl andouille shoulder drumstick salami tongue, ground round picanha. Ham picanha chuck doner pancetta kevin meatloaf turducken. Bresaola pork chop tri-tip landjaeger rump hamburger pork belly corned beef bacon fatback drumstick pork. Porchetta corned beef ground round, ham hock hamburger tri-tip bacon brisket t-bone shankle jerky pancetta shoulder beef kielbasa. Beef ribs salami pork meatball tail hamburger cupim alcatra swine corned beef pork chop leberkas."},
        {name:"Eagle's Nest", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg", description: "Bacon ipsum dolor amet venison jowl andouille shoulder drumstick salami tongue, ground round picanha. Ham picanha chuck doner pancetta kevin meatloaf turducken. Bresaola pork chop tri-tip landjaeger rump hamburger pork belly corned beef bacon fatback drumstick pork. Porchetta corned beef ground round, ham hock hamburger tri-tip bacon brisket t-bone shankle jerky pancetta shoulder beef kielbasa. Beef ribs salami pork meatball tail hamburger cupim alcatra swine corned beef pork chop leberkas."}
    ];

function seedDB() {
  Campground.remove({},function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds");
            //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed,function(err,campground){
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("Added a campground");
            //             //add comment on each campground
            //             Comment.create({text: "This place is great but I wish there was internet",author: "Homer"},function(err,comment){
            //                 if(err) {
            //                     console.log(err);
            //                 } else {
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("Created a new comment");
            //                 }
            //             });
            //         }
            //     });
            // });
        }
    });  
}

module.exports = seedDB;