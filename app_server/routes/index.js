var express = require('express');
var router = express.Router();

var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
//Implement this before heroku deployment
if(process.env.NODE_ENV === "production"){
    apiOptions.server = "https://complain-counter.herokuapp.com";
}


/* GET home page. */
router.get('/', function(req,res){
    var requestOptions = {
         url: apiOptions.server + "/api/rages/",
        method: "GET",
        json:{},
        qs:{}
    };
    console.log(requestOptions);
    
    request(requestOptions, function (err, response, body) {
         if(err){
           console.log(err);
           console.log(body);
           console.log(response);
        }else{
           res.render('index',{
               rages: body,
               title: 'Complaint Counter'
           });
       }
    });
    
});

router.get('/about', function(req,res){
  res.render('generic-text', {
        title: 'Complaint Counter',
        content: 'This website was made to test out Node.js development, the content of this website is entirely fictional and should not be taken seriously'
    });
});







module.exports = router;
