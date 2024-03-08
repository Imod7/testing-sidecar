const axios = require('axios');
const { json } = require('express');
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

async function printBlocks(blocksInfo) {
  console.log(`XCM Msgs in Blocks Endpoint`);
  console.log(`===========================`);
  console.log("blocksInfo", blocksInfo);

  try {
    for (var i=0; i < blocksInfo.length; i++) {
      var blocksInfoSplit = blocksInfo[i].split("-");
      console.log("\nblocksInfoSplit", blocksInfoSplit);
      const endpoint = `${BASE_URL}` + '/blocks/' + blocksInfoSplit[0];
      const response = await axios.get(endpoint, { params: { decodedXcmMsgs: true } });

      console.log(`${colours.fg.yellow} ${i + 1} Endpoint: ${endpoint}` + '?decodedXcmMsgs=true' + `${colours.reset}`);

      if (response.data.decodedXcmMsgs != undefined) {
        console.log("Downward Messages:");
        response.data.decodedXcmMsgs.downwardMessages?.forEach(element => {
          console.log(element, "\n");
        });

        console.log("Horizontal Messages:");
        response.data.decodedXcmMsgs.horizontalMessages?.forEach((element, index, _) => {
          const jsonObj = JSON.parse(blocksInfoSplit[1])
          if (element.sentAt != jsonObj[index].sentAt.toString() || element.paraId != jsonObj[index].para_id.toString()) {
            console.log(`${colours.fg.red} FAIL ${colours.reset}`);
          } else {
            console.log(`${colours.fg.green} PASS ${colours.reset}`);
          }

          console.log(element, "\n");
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
}

const main = async () => {
  var arguments = process.argv;
  var blocks = [];

  if (arguments.length === 3) {
    blocks = fs.readFileSync('blocks-with-xcm-msgs/' + arguments[2] + '.txt').toString().split("\n");
  } else if (arguments.length === 4 && arguments[3] === 'transit') {
    blocks = fs.readFileSync('blocks-with-xcm-msgs/' + arguments[2] + '_intransit.txt').toString().split("\n");
  }
  printBlocks(blocks);
  fs.closeSync(1);
};

main();
