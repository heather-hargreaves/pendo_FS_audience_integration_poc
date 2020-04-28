const optimizely = require('./optimizely.js');
const pendo = require('./pendo.js');
const constants = require('./constants.js');
const express = require('express');
const app = express()
const port = 3000

const userid = constants.userid
const experiment_key = constants.experiment_key
let variation;

// request visitor report
pendo.requestList()

app.get("/experiment", function(req, res){
   // check list of users to see if current user id is on list
   pendo.userFromReport(userid);
   variation = optimizely.activate(experiment_key, userid, pendo.attributes);
   if(variation) {
     res.send(variation);
   }
   else {
     res.send('this person did not get a variation');
   }
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
