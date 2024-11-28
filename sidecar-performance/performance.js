const axios = require('axios');
const fs = require('fs');
const { exit } = require('node:process');

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

async function getMetrics(network, startBlock, endBlock) {
  let arrMetrics = [];
  const extrinsicsPerBlock = {};
  let perfMetricsFinal = {};
  console.log(`Execution Time in Blocks Endpoint`);
  console.log(`=================================`);
  console.log("Block Range: ", startBlock, "-" ,endBlock);

  try {
    for (var blockNum = startBlock; blockNum <= endBlock; blockNum++) {
      const endpoint = `${BASE_URL}` + '/blocks/' + blockNum;
      const response = await axios.get(endpoint);
      console.log(`\n${colours.fg.yellow}Endpoint: ${endpoint}` + `${colours.reset}`);
      console.log(`Block:${colours.fg.green} ${blockNum} ${colours.reset}`);

      if (response.data != undefined) {
        perfMetricsFinal = JSON.parse(JSON.stringify(response.data.performanceMetrics));
        extrinsicsPerBlock[blockNum] = response.data.extrinsics.length;
        perfMetricsFinal['blockHeight'] = blockNum;
        console.log(`Extrinsics Volume: ${colours.fg.green}` + response.data.extrinsics.length + `${colours.reset}`);
        perfMetricsFinal['numberOfExtrinsics'] = response.data.extrinsics.length;
        let eventsCount = 0;
        let eventsArray = [];
        for (var i = 0; i < response.data.extrinsics.length; i++) {
          eventsCount += response.data.extrinsics[i].events.length;
          eventsArray.push(response.data.extrinsics[i].events.length);
          
          // console.log(`Extrinsic ${i} Events: ${colours.fg.green}` + response.data.extrinsics[i].events.length + `${colours.reset}`);
        }
        console.log(`Events Count (in extrinsics): ${colours.fg.green} ${eventsCount} ${colours.reset}`);
        perfMetricsFinal['numberOfEvents'] = eventsCount;
        const frequency = eventsArray.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {});

        perfMetricsFinal['numberOfEventsPerExtrinsic'] = frequency;

        // Find the highest frequency
        const highestFrequency = Math.max(...Object.values(frequency));

        // The most common amount of events in an extrinsic is `mostFrequentEventsAmount`
        // Calculating it by filtering the extrinsics that have the ${highestFrequency} events
        const mostFrequentEventsAmount = Object.entries(frequency)
            .filter(([key, count]) => count === highestFrequency)
            .map(([key]) => key);
        console.log(`Most common amount of events in an extrinsic: ${mostFrequentEventsAmount} `);

        console.log(`\nPerformance Metrics & Stats`);
        console.log(`=================================`);
        console.log(perfMetricsFinal);
        arrMetrics.push(Object.values(perfMetricsFinal));
      }
    }
  } catch (error) {
    if (error.code == 'ECONNREFUSED') {
      console.log(`${colours.fg.red} Please start your Sidecar instance and connect to ${arguments[2]} ${colours.reset}`);
    }
  }
  return arrMetrics;
}

const main = async () => {
  if (process.argv.length <= 3) {
    console.log("Please give as arguments the network and block range");
    exit(1);
  }
  let [ startBlock, endBlock ] = process.argv[3].split("-").map(Number);
  const data = await getMetrics(process.argv[2], startBlock, endBlock);

  // write metrics results in 'output.txt'
  for (let i =0; i < data.length; i++) {
    fs.appendFileSync('output.txt', data[i].join(",") + "\n", (err) => {
      if (err) throw err;
    });
  }
  fs.closeSync(1);
};

main();
