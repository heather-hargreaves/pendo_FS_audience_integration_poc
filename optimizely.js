const constants = require('./constants.js');
const optimizelySDK = require('@optimizely/optimizely-sdk');

optimizelySDK.setLogLevel('debug');
optimizelySDK.setLogger(optimizelySDK.logging.createLogger())

const optimizelyClientInstance = optimizelySDK.createInstance({
  sdkKey: constants.SDK_key,
  datafileOptions: {
    autoUpdate: true,
  },
});

module.exports = optimizelyClientInstance;
