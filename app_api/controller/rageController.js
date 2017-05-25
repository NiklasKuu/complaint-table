//required for MongoDB connection
var mongoose = require('mongoose');
var rage = mongoose.model('Rage');

var formatDate = function(date){
    var dateArray = new Array();
    
    
    dateArray[0] = date.getDate();
    dateArray[1] = date.getMonth() + 1;
    dateArray[2] = date.getFullYear();
    
    dateArray[3] = date.getHours();
    dateArray[4] = date.getMinutes();
    
    for (var i = 0; i < dateArray.length;i++){
        
        if(dateArray[i]<10){
            dateArray[i] = "0"+dateArray[i];
        }
    };
    
    return dateArray[0] + "." + dateArray[1] + "." + dateArray[2] + " " + dateArray[3] + ":" + dateArray[4];
};

//function that sends the parameter status and content as JSON
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};



//returns all rage documents in the database as an array
module.exports.getAllRages = function (req, res) {
    rage.find().exec(function (err, rageArray) {
        if (err) {
            sendJsonResponse(res, 400,err);
        } else {
            sendJsonResponse(res, 200, rageArray);
        }
    });
};
//creates a new Rage document based on request body with creation time
module.exports.createNewRage = function (req,res) {
    rage.create({
        dateTime: formatDate(new Date()),
        tank: req.body.tank,
        map: req.body.map,
        reason: req.body.reason
    },function(err, newRageDoc){
        if(err){
            sendJsonResponse(res,400,err);
        } else {
            sendJsonResponse(res,200,newRageDoc);
        }
    });
};

module.exports.deleteRage = function (req,res){
    var rageid = req.params.rageid;
    if(rageid){
        rage.findByIdAndRemove(rageid).exec(function(err,rageDoc){
            if(err){
                sendJsonResponse(res,404,err);
            } else {
                sendJsonResponse(res,200,null);
            }
        });
        
    } else {
        sendJsonResponse(res,404,{
            message: "No rageid given"
        });
    }
};


