const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({

  name:String,
  email:String,
  place:String,
  rate:String,
  Visitagain:String,
  suggestion:String

});

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports=Feedback;
