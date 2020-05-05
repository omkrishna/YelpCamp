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
	image:String,
	description:String
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
	var description = req.body.description;
	Campground.create({name:name,image:image,description:description},function(err,campground){
		if(err){
			console.log(err);
		} else {
			console.log(campground);
		}
	})
	
	res.redirect("/");
})

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground:campground})
		}
	})
	
})


app.listen(8000,function(){
	console.log("The Yelp Camp server has started");
})