var express = require('express');
var app = express();
var path = require('path');
var dal = require('./dal');
var admin = require('./admin.json');

app.use(express.static('client/build'));

//create account using firebase
app.get('/account/create/:name/:email/:password', function(req, res){
   //Mongodb
   dal.find(req.params.email)
   .then(users =>{
       //check to see if user exists
       if(users.length > 0){
           console.log('User already exists.')
           res.send('User Already Exists')
       } else {
           //if user not found create within mongodb
           dal.create(req.params.name, req.params.email, req.params.password)
               .then(user =>{
                   console.log(user);
               })
       }
   })
    
    //firebase authentication
    const idToken = req.headers.authorization;
    console.log('header: ', idToken);
    
    if(!idToken){
        res.status(404).send();
        return
    }

    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken){
            console.log(`Decoded Token: ${decodedToken}`);
            res.send("Authentication Succsessful!");
        }).catch(function(error){
            console.log(`Error: ${error}`);
        });
});

//All Accounts within mongo
app.get('/account/all', function(req,res){
    dal.all()
        .then(docs =>{
            console.log(docs);
            res.send(docs);
        })
})

//update amount for withdraw and deposit
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});



var PORT = process.env.PORT || 3003;
app.listen(PORT, console.log("Port running on: ", PORT));
