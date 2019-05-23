							var express = require('express');


							var bodyParser = require('body-parser');

							var request = require('request');

							var mongoose = require('mongoose');

							var path = require('path');

							var app = express();

							app.use(bodyParser.json());

							app.use(bodyParser.urlencoded({ extended: true }));

							app.use(express.static(path.join(__dirname, 'public')));


							const dbUri="mongodb://abhinav:Abhinav123@ds159036.mlab.com:59036/tourist_guide";

							mongoose.connect(dbUri,{useNewUrlParser:true},(err)=>{
								if(!err){
									console.log('connected');
								}else{
									console.log(err)
								}
							});

							const Feedback = require('./models/Feedback');



							app.get('/',function(req,res){

								console.log(req.url);

								res.render('index1.ejs');
							});


							app.get('/form',function(req,res){

								res.render('form.ejs',{name:req.body.name});

							});


							app.post('/form',function(req,res){

							  var tag=req.body.tag;

							 console.log(tag);
							  var basUrl=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${tag}+in+india&key=AIzaSyALWmLwsAQzrj9ZCzYCldEYJC9kD9BZGyY`;

							    request(basUrl,
							  	(err,response,body)=>{
							  		if(!err){
									var  data = JSON.parse(body);
									console.log(data);
							        res.render('show.ejs',{data:data});
							    }else{
										res.render('error.ejs');
									}
							});
							});


						/////    map
						app.post('/map/latitude/:lat/longitude/:lng/address/:add',(req,res)=>{


							    res.render('map.ejs',{
										lat:req.params.lat,
										lng:req.params.lng,
										origin:req.body.origin,
										dest:req.params.add
									})
						})

						app.post('/map/destination/:dest/origin/:org',(req,res)=>{


										console.log("origin "+req.params.org);

										console.log("destination "+req.params.dest);

									res.render('map.ejs',{
										origin:req.params.org,
										dest:req.params.dest
									})
						})



							app.post('/place/:id',(req,res)=>{


								let id = req.params.id;
							    console.log(id);
							    let url=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=photo,formatted_address,address_component,opening_hours,geometry,name,rating,formatted_phone_number,review&key=AIzaSyALWmLwsAQzrj9ZCzYCldEYJC9kD9BZGyY`;
							     request(url,
							  	(err,response,body)=>{
							  		if(!err){

									var  data = JSON.parse(body);


									res.render('placedetails.ejs',{data:data})

								}else{
									res.render('error.ejs');
								}
							});
							});



							app.post('/place/nearby/:id/origin/:org',(req,res)=>{


								let id = req.params.id;
									console.log(id);
									let url=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=photo,formatted_address,opening_hours,geometry,name,rating,formatted_phone_number,review&key=AIzaSyALWmLwsAQzrj9ZCzYCldEYJC9kD9BZGyY`;
									 request(url,
									(err,response,body)=>{
										if(!err){


									var  data = JSON.parse(body);

								  	res.render('nearbydetails.ejs',{data:data,
										origin:req.params.org})

									}else{
										res.render('error.ejs');
									}
							});
							});



							app.post('/nearby/latitude/:lat/longitude/:lng/address/:add',(req,res)=>{

								console.log(req.body.type);
								console.log(req.body.distance);
								console.log(req.body.price);

								let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=${req.body.distance}&type=${req.body.type}&key=AIzaSyALWmLwsAQzrj9ZCzYCldEYJC9kD9BZGyY`;
								request(url,(err,response,body)=>{
									//console.log('res'+body);
									if(!err){
										const data=JSON.parse(body);
										res.render('nearby.ejs',{data:data,
										origin:req.params.add});

									}else{
										res.render('error.ejs');
									}
								}

								)

							 });

							 app.get('/response',(req,res)=>{
										 res.render('response_form.ejs');
							 })

							 app.post('/response',(req,res)=>{

										let newFeedback = new Feedback({
											name:req.body.name,
										  email:req.body.email,
										  place:req.body.place,
										  rate:req.body.rating,
										  Visitagain:req.body.Visitagain,
										  suggestion:req.body.suggestion
										});

										newFeedback.save()
										  .then((newf)=>{
												console.log(newf.name)
												res.render('success.ejs');
											})
											.catch((err)=>{
												res.render('error.ejs')
											})
							 })










							app.listen(9090,function(err){
								if(!err)
								{
									console.log('listening at port 9090')
								}
							;});
