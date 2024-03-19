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
      const endpoint = `${BASE_URL}` + '/blocks/' + blocksInfoSplit[0];
      const response = await axios.get(endpoint, { params: { decodedXcmMsgs: true } });

      console.log(`\n${colours.fg.yellow}${i + 1} Endpoint: ${endpoint}` + '?decodedXcmMsgs=true' + `${colours.reset}`);

      if (response.data.decodedXcmMsgs != undefined) {
        console.log(`${colours.fg.cyan} Downward Messages: ${colours.reset}`);
        response.data.decodedXcmMsgs.downwardMessages?.forEach((element, index, _) => {
          console.log("index: ", index);
          const jsonObj = JSON.parse(blocksInfoSplit[1])

          if (element.sentAt === jsonObj.DM[index].sentAt.toString()) {
            console.log(`${colours.fg.green} PASS (same sentAt) ${colours.reset}`);
          } else {
            console.log(`${colours.fg.red} FAIL (diff sentAt) ${colours.reset}`);
          }

          if (response.data.decodedXcmMsgs.downwardMessages.length === Object.keys(jsonObj.DM).length) {
            console.log(`${colours.fg.green} PASS (same # of xcm) ${colours.reset}`);
          } else {
            console.log(`${colours.fg.red} FAIL (diff # of xcm) ${colours.reset}`);
          }

          console.log(element);
        });

        console.log(`${colours.fg.cyan} Horizontal Messages: ${colours.reset}`);
        console.log(response.data.decodedXcmMsgs.horizontalMessages)
        response.data.decodedXcmMsgs.horizontalMessages?.forEach((element, index, _) => {
          console.log("index: ", index);
          const jsonObj = JSON.parse(blocksInfoSplit[1]);
          if (jsonObj.HM[index].hasOwnProperty("destinationParaId")) {
            if (element.destinationParaId === jsonObj.HM[index].destinationParaId.toString()) {
              console.log(`${colours.fg.green} PASS (same destinationParaId) ${colours.reset}`);
            } else {
              console.log(element)
              console.log(`${colours.fg.red} FAIL (diff destinationParaId) ${colours.reset}`);
            }
          }

          if (jsonObj.HM[index].hasOwnProperty("sentAt")) {
            if (element.sentAt === jsonObj.HM[index].sentAt.toString()) {
              console.log(`${colours.fg.green} PASS (same sentAt) ${colours.reset}`);
            } else {
              console.log(`${colours.fg.red} FAIL (diff sentAt) ${colours.reset}`);
            } 
          }

          if (element.originParaId === jsonObj.HM[index].originParaId.toString()) {
            console.log(`${colours.fg.green} PASS (same originParaId) ${colours.reset}`);
          } else {
            console.log(`${colours.fg.red} FAIL (diff originParaId) ${colours.reset}`);
          }

          if (jsonObj.HM[index].hasOwnProperty("data")) {
            for (var key of Object.keys(jsonObj.HM[index]["data"])) {
              console.log("  key : ", key);
              
              if (jsonObj.HM[index]["data"][key].hasOwnProperty("transact")) {
                var elementVersioned = element.data[key].hasOwnProperty("v3") ? element.data[key].v3 : element.data[key].v2;
                if (elementVersioned[2].transact.call.encoded === jsonObj.HM[index]["data"][key]?.transact.toString()) {
                  console.log(`${colours.fg.green}  PASS (same transact call) ${colours.reset}`);
                } else {
                console.log(`${colours.fg.red}  FAIL (diff transact call) ${colours.reset}`);
                }
              }

              if (jsonObj.HM[index]["data"][key].hasOwnProperty("fungible")) {
                var elementVersioned = element.data[key].hasOwnProperty("v3") ? element.data[key].v3 : element.data[key].v2;
                if (elementVersioned[0].withdrawAsset[0].fun.fungible == jsonObj.HM[index]["data"][key]?.fungible.toString()) {
                  console.log(`${colours.fg.green}  PASS (same fun) ${colours.reset}`);
                } else {
                  console.log(`${colours.fg.red}  FAIL (diff fun) ${colours.reset}`);
                }
              }

              if (jsonObj.HM[index]["data"][key].hasOwnProperty("beneficiary")) {
                if (element.data[key].v2[3].depositAsset.beneficiary.interior.x1.accountId32.id == jsonObj.HM[index]["data"][key]?.beneficiary.toString()) {
                  console.log(`${colours.fg.green}  PASS (same beneficiary) ${colours.reset}`);
                } else {
                  console.log(`${colours.fg.red}  FAIL (diff beneficiary) ${colours.reset}`);
                }

              }
            }        
          }

          if (response.data.decodedXcmMsgs.horizontalMessages.length === Object.keys(jsonObj.HM).length) {
            console.log(`${colours.fg.green} PASS (same # of xcm) ${colours.reset}`);
          } else {
            console.log(`${colours.fg.red} FAIL (diff # of xcm) ${colours.reset}`);
          }

          console.log(element);
        });

        console.log(`${colours.fg.cyan} Upward Messages: ${colours.reset}`);
        response.data.decodedXcmMsgs.upwardMessages?.forEach((element, index, _) => {
          console.log("index: ", index);
          const jsonObj = JSON.parse(blocksInfoSplit[1])
          if (element.originParaId === jsonObj.UM[index].originParaId.toString()) {
            console.log(`${colours.fg.green} PASS (same paraId) ${colours.reset}`);
          } else {
            console.log(`${colours.fg.red} FAIL (diff paraId) ${colours.reset}`);
          }
          if (jsonObj.UM[index].hasOwnProperty("data")) {
            for (var key of Object.keys(jsonObj.UM[index]["data"])) {
              console.log("  key : ", key);

              if (jsonObj.UM[index]["data"][key].hasOwnProperty("transact")) {
                var elementVersioned = element.data[key].hasOwnProperty("v3") ? element.data[key].v3 : element.data[key].v2;
                if (elementVersioned[2].transact.call.encoded === jsonObj.UM[index]["data"][key]?.transact.toString()) {
                  console.log(`${colours.fg.green}  PASS (same transact call) ${colours.reset}`);
                } else {
                console.log(`${colours.fg.red}  FAIL (diff transact call) ${colours.reset}`);
                }
              }

              if (jsonObj.UM[index]["data"][key].hasOwnProperty("fungible")) {
                var elementVersioned = element.data[key].hasOwnProperty("v3") ? element.data[key].v3 : element.data[key].v2;
                if (elementVersioned[0].withdrawAsset[0].fun.fungible == jsonObj.UM[index]["data"][key]?.fungible.toString()) {
                  console.log(`${colours.fg.green}  PASS (same fun) ${colours.reset}`);
                } else {
                  console.log(`${colours.fg.red}  FAIL (diff fun) ${colours.reset}`);
                }
              }

              if (jsonObj.UM[index]["data"][key].hasOwnProperty("beneficiary")) {
                if (element.data[key].v2[3].depositAsset.beneficiary.interior.x1.accountId32.id == jsonObj.UM[index]["data"][key]?.beneficiary.toString()) {
                  console.log(`${colours.fg.green}  PASS (same beneficiary) ${colours.reset}`);
                } else {
                  console.log(`${colours.fg.red}  FAIL (diff beneficiary) ${colours.reset}`);
                }

              }
            }            
          }

          if (response.data.decodedXcmMsgs.upwardMessages.length === Object.keys(jsonObj.UM).length) {
            console.log(`${colours.fg.green} PASS (same # of xcm) ${colours.reset}`);
          } else {
            console.log(`${colours.fg.red} FAIL (diff # of xcm) ${colours.reset}`);
          }

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
