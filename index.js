const optimizely = require('./optimizely.js');
const express = require('express');
const rp = require('request-promise');
const app = express()
const port = 3000


const userid = "USER ID"
const experiment_key = "EXPERIMENT KEY FROM OPTIMIZELY UI"
let attributes = {'ENTITLEMENT': 'BETA'}

var variation;



const reportId = "PENDO VISITOR REPORT ID";
const url = 'https://app.pendo.io/api/v1/report/' + reportId + '/results.json';


  const options = {
    url: url,
    headers: {
      'x-pendo-integration-key': 'PENDO INTEGRATION KEY'
    }
  };


  // Synchronous request to Pendo to retrieve array of visitor ids from visitor report
  rp(options)
      .then(function (resp) {
          pendoAudienceList = JSON.parse(resp);
          // looping through Pendo visitor list to see if it matches the user id provided in this file
          for(i = 0; i < pendoAudienceList.length; i++){
            if(pendoAudienceList[i].visitorId === userid) {
              // if the visitor ids do match, then enrich the attributes object above with a new attribute and set it to true
              // Note: 'PENDO_AUDIENCE' below needs to be defined as an 'attribute' in the Optimizely UI. Then create an audience that uses that attribute and set to true; lastly attach that audience to the experiment in the UI.
              // You can change the attribute to whatever makes sense for your use case, 'PENDO_AUDIENCE' as an attribute name is used as a placeholder name.
              attributes.PENDO_AUDIENCE = true
              // Logging the new enriched attributes object with the Pendo audience.
              console.log(attributes);
            }
          }
      })
      .catch(function (err) {
          console.log(err);
      });


app.get("/experiment", function(req, res){
   // Optimizely activate call makes a decision and takes into consideration on whether the user's attributes match the audience criteria defined in the Optimizely UI
   variation = optimizely.activate(experiment_key, userid, attributes)
   if(variation) {
     // if the user gets a variation then we send which variation that visitor received
     res.send(variation)
   }
   else {
     // if they are not bucketed into a variation and receive null then we will send this string
     res.send('this person did not get a variation')
   }
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
