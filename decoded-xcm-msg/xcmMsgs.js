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
  var array = [];
  array = fs.readFileSync('blocks-with-xcm-msgs/' + arguments[2] + '.txt').toString().split("\n");

  console.log(`XCM Msgs in Blocks Endpoint`);
  console.log(`===========================`);
  try {
    for (var i=0; i < array.length; i++) {
      const endpoint = `${BASE_URL}` + '/blocks/' + array[i];
      const response = await axios.get(endpoint, { params: { decodedXcmMsgs: true } });
      console.log(`${colours.fg.yellow} ${i + 1} Endpoint: ${endpoint}` + '?decodedXcmMsgs=true' + `${colours.reset}`);
      if (response.data.decodedXcmMsgs != undefined) {
        console.log("Downward Messages:");
        response.data.decodedXcmMsgs.downwardMessages?.forEach(element => {
          console.log(element);
        });
        console.log("Horizontal Messages:");
        response.data.decodedXcmMsgs.horizontalMessages?.forEach(element => {
          console.log(element);
        });
        console.log("Upward Messages:");
        response.data.decodedXcmMsgs.upwardMessages?.forEach(element => {
          console.log(element);
        });
      }
    }
  } catch (error) {
    if (error.code == 'ECONNREFUSED') {
      console.log(`${colours.fg.red} Please start your Sidecar instance and connect to ${arguments[2]} ${colours.reset}`);
    } else {
      console.log(`${colours.fg.red} ERROR ${colours.reset}`);
      console.log(`${colours.fg.red} Note : make sure to connect your sidecar instance to the chain you are testing ${colours.reset}`);
    }
  }
};

main();
