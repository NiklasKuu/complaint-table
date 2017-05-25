var mongoose = require( 'mongoose' );


var rageSchema = new mongoose.Schema({
   dateTime: {type: String, required: true},
   tank: {type: String, required: true},
   map: {type: String, required:true},
   reason: {type: String, required: true}
});


mongoose.model('Rage', rageSchema);
