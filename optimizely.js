const optimizelySDK = require('@optimizely/optimizely-sdk');

optimizelySDK.setLogLevel('debug');
optimizelySDK.setLogger(optimizelySDK.logging.createLogger())

const optimizelyClientInstance = optimizelySDK.createInstance({
  sdkKey: 'OPTIMIZELY SDK KEY',
  datafileOptions: {
    autoUpdate: true,
  },
});


module.exports = optimizelyClientInstance;
