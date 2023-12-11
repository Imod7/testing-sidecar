const axios = require('axios');
const { error } = require('node:console');
const fs = require('node:fs');

const colours = {
  reset: "\x1b[0m",
  fg: {
      red: "\x1b[1m\x1b[31m",
      green: "\x1b[1m\x1b[32m",
      yellow: "\x1b[1m\x1b[33m",
      cyan: "\x1b[36m",
  },
};

const BASE_URL = 'http://127.0.0.1:8080';

const main = async () => {
  var arguments = process.argv; 
  var chain = '';
  var array = [];
  switch(arguments[2]) {
    case 'kusama':
      array = fs.readFileSync('blocks-with-xcm-msgs/kusama.txt').toString().split("\n");
      chain = 'kusama';
      break;
    case 'polkadot':
      array = fs.readFileSync('blocks-with-xcm-msgs/polkadot.txt').toString().split("\n");
      chain = 'polkadot';
      break;
    case 'kah':
      array = fs.readFileSync('blocks-with-xcm-msgs/kusama-asset-hub.txt').toString().split("\n");
      chain = 'kusama-asset-hub';
      break;
    case 'pah':
      array = fs.readFileSync('blocks-with-xcm-msgs/polkadot-asset-hub.txt').toString().split("\n");
      break;
    default:
      console.log('Please choose one of the following values as argument: kusama, polkadot, kah or pah');
      process.exit(1);
  }

  console.log(`XCM Msgs in Blocks Endpoint`);
  console.log(`===========================`);
  try {
    for (var i=0; i < array.length; i++) {
      const endpoint = `${BASE_URL}` + '/blocks/' + array[i];
      const response = await axios.get(endpoint, { params: { decodedXcmMsgs: true } });
      console.log(`${colours.fg.yellow} ${i + 1} Endpoint: ${endpoint}` + '?decodedXcmMsgs=true' + `${colours.reset}`);
      if (response.data.decodedXcmMsgs != undefined) {
        response.data.decodedXcmMsgs.forEach(element => {
          console.log(element);
        });
      }
    }
  } catch (error) {
    if (error.code == 'ECONNREFUSED') {
      console.log(`${colours.fg.red} Please start your Sidecar instance and connect to ${chain} ${colours.reset}`);
    } else {
      console.log(`${colours.fg.red} ERROR ${colours.reset}`);
    }
  }
};

main();
