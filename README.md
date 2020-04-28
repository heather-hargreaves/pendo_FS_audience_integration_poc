# Optimizely Full Stack & Pendo Audience

This is a proof of concept demonstrating how to use Pendo data as audience criteria for an Optimizely experiment or feature flag.

## Requirements
* Optimizely Full Stack or Rollouts account
* Pendo account with integration key

## Installation

This application runs on a Node.js server, make sure Node.js and npm are up to date

```bash
npm install
```

Run server
```bash
node index.js
```


## Getting up and running

1. Create an Optimizely experiment in the app
2. Update the ```SDK_key``` and ```experiment_key``` in the ```constants.js``` folder based on your Optimizely project
3. In Pendo create a Visitor report based on criteria you want to target this experiment to.
4. Update the ```pendoKey``` and ```pendoReportId``` in the ```constants.js``` folder based on the report created in Pendo.
5. In Optimizely create an attribute called ```PENDO_AUDIENCE``` and add an experiment using the ```PENDO_AUDIENCE``` attribute and use a boolean match and have it evaluate to ```true```.
5. Update the ```userid``` in the ```constants.js``` to test out the audience validation and see data populate the Optimizely experiment results

### Note:
* This proof of concept works for Optimizely Feature Flags as well, just make sure to create a feature flag in the Optimizely dashboard and update the ```experiment_key``` with your feature flag key.
* This is meant to show how audience data flows from Pendo to Optimizely for decisions, for production use we recommend caching the attributes to minimize http requests.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
