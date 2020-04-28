const constants = require('./constants.js');
const rp = require('request-promise')

let pendoAudienceList;
let attributes = {};
const userid = constants.userid


var options = {
  method: 'GET',
  uri: 'https://app.pendo.io/api/v1/report/' + constants.pendoReportId + '/results.json',
  headers: {
    'x-pendo-integration-key': constants.pendoKey
  }
};

const requestList = function() {
  rp(options)
      .then(function (resp) {
          pendoAudienceList = JSON.parse(resp);
      })
      .catch(function (err) {
          console.log(err);
      });
};


const userFromReport = function(userid) {
  for(i = 0; i < pendoAudienceList.length; i++){
    if(pendoAudienceList[i].visitorId === userid) {
      attributes.PENDO_AUDIENCE = true;
    }
  }
}

module.exports = {
  requestList: requestList,
  userFromReport: userFromReport,
  attributes: attributes
}
