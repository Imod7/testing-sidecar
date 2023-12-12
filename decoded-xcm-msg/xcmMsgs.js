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
      chain = 'kusama';
      break;
    case 'polkadot':
      chain = 'polkadot';
      break;
    case 'kah':
      chain = 'kusama-asset-hub';
      break;
    case 'pah':
      chain = 'polkadot-asset-hub';
      break;
    case 'astar':
      chain = 'astar';
      break;
    case 'moonbeam':
      chain = 'moonbeam';
      break;
    case 'acala':
      chain = 'acala';
      break;
    case 'basilisk':
      chain = 'basilisk';
      break;
    default:
      console.log('Please choose one of the following values as argument: kusama, polkadot, kah, pah, astar, moonbeam, acala, basilisk');
      process.exit(1);
  }
  array = fs.readFileSync('blocks-with-xcm-msgs/' + chain + '.txt').toString().split("\n");

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
