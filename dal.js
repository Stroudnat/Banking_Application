//Data Abstraction Layer
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://Nate:Natewill1@mongobank.eb4ab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db = null;
//connection to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
   if(err){
       console.log('An error has occured: ', err);
       return;
   }
   console.log('Connected successfully to Mongodb server');

   //connect to my applications db or create it if nonexistant
   db = client.db('banking-app-ii');
});

    //create user
    function create(name, email, password){
        return new Promise((resolve, reject) =>{
            const collection = db.collection('users');
            const doc = {name, email, password, balance:0};
            collection.insertOne(doc, {w:1}, function(err, result){
                err ? reject(err) : resolve(doc); //promise key words
            });
        })
    }

    //find single user by email
    function find(email){
        return new Promise((resolve, reject)=>{
            const customers = db
                .collection('users')
                .find({email: email})
                .toArray(function(err, docs){
                    err ? reject(err) : resolve(docs);
                });
        })
    }

    //all users
    function all(){
        return new Promise((resolve, reject) =>{
            const customers = db
                .collection('users')
                .find({})
                .toArray(function(err,docs){
                    err ? reject(err) : resolve(docs); //keywords to return docs from database to calling function
                });
        })
    }

    // update account with deposite or withdraw
    function update(email, amount){
        return new Promise((resolve, reject) => {    
            const customers = db
                .collection('users')            
                .findOneAndUpdate(
                    {email: email},
                    { $inc: { balance: amount}},
                    { returnOriginal: false },
                    function (err, documents) {
                        err ? reject(err) : resolve(documents);
                    }
                );            
    
    
        });    
    }



module.exports = {create, all, find, update};