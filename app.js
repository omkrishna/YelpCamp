var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


///schema setup
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String
});

var Campground = mongoose.model("Campground",campgroundSchema);
/*
Campground.create({name :"Solang Valley", image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/solang-valley-manali.jpg"}
,function(err,campground){

	if(err){
		console.log("Something Went wrong");
		console.log(err);
	} else {
		console.log("Data saved");
		console.log(campground);
	}

});*/



app.get("/", function(req,res){
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err)
		} else {
			res.render("campgrounds",{campgrounds:allcampgrounds});
		}
	})
	
})



app.post("/",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	Campground.create({name:name,image:image},function(err,campground){
		if(err){
			console.log(err);
		} else {
			console.log(campground);
		}
	})
	
	res.redirect("/");
})


app.listen(8000,function(){
	console.log("The Yelp Camp server has started");
})