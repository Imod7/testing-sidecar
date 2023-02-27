const axios = require('axios');

const colours = {
  reset: "\x1b[0m",
  fg: {
      red: "\x1b[1m\x1b[31m",
      green: "\x1b[1m\x1b[32m",
      cyan: "\x1b[36m",
  },
};

const BASE_URL = 'http://127.0.0.1:8080';

const failedRequests = [];

const cliProgress = require('cli-progress');

const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}` + endpoint);
    // console.log(`${colours.fg.green} SUCCESS: ${response.status} ${colours.reset}`);
    // console.log(`${BASE_URL}${endpoint}`);
    return response;
  } catch (errors) {
    // console.log(`${colours.fg.red} FAIL: ${errors.response.status} ${colours.reset}`);
    return errors;
  }
};

const queryEndpoint = async (pallets, param, endpoint) => {
  console.log(`\nTesting ${colours.fg.green} ${endpoint} ${colours.reset} Endpoint for All Pallets by pallet ${colours.fg.green} ${param} ${colours.reset}`);
  console.log(`==================================================================== ${colours.reset}`);
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(pallets.length - 1, 0);
  for (var i=0; i < pallets.length; i++) {
    // process.stdout.write(`Pallet Index: ${colours.fg.cyan}` + pallets[i]['index'] + `${colours.reset} - Pallet Name: ${colours.fg.cyan}` + pallets[i]['name'] + `${colours.reset}\t ->  `);
    const result = await getData('/pallets/' + pallets[i][param] + `/${endpoint} \n`);
    bar1.increment(1);
    // console.log(result.status)
    if (result.status != '200') {
      failedRequests.push([parseInt(pallets[i]['index']), pallets[i]['name'], endpoint, pallets[i][param], result.status]);
    }
  }
  bar1.stop();
}

const main = async () => {
  console.log(`Retrieving Metadata + Pallets Indices`);
  console.log(`===================================== `);
  const metadata = await getData('/runtime/metadata');
  const pallets = metadata.data.metadata.v14.pallets;
  // console.log(pallets.length);
  // console.log(pallets);

  for (var i=0; i < pallets.length; i++) {
    console.log(pallets[i].name);
    // console.log(pallets[i].calls.type);
    // console.log(pallets[i].constants);

		// const { number } = await this.api.rpc.chain.getHeader(hash);
		// const parsedPalletName = stringCamelCase(palletMeta.name.toString());
		// const dispatchables = this.api.tx[parsedPalletName];
  }

  const storageByIndex = await queryEndpoint(pallets, 'index', 'storage');
  const storageByName = await queryEndpoint(pallets, 'name', 'storage');
  const errorsByIndex = await queryEndpoint(pallets, 'index', 'errors');
  const errorsByName = await queryEndpoint(pallets, 'name', 'errors');
  const eventsByIndex = await queryEndpoint(pallets, 'index', 'events');
  const eventsByName = await queryEndpoint(pallets, 'name', 'events');
  const constsByIndex = await queryEndpoint(pallets, 'index', 'consts');
  const constsByName = await queryEndpoint(pallets, 'name', 'consts');
  const dispatchByIndex = await queryEndpoint(pallets, 'index', 'dispatchables');
  const dispatchByName = await queryEndpoint(pallets, 'name', 'dispatchables');
  // const dispatchByNameOnlyIds = await queryEndpoint(pallets, 'name', 'dispatchables?onlyIds=true');
  // const dispatchByIndexDispatchItem = await getData('/pallets/technicalMembership/dispatchables/clearPrime' + ` \n`);

  failedRequests.sort();
  console.log(`Array with All Failed Requests`);
  console.log(`============================== `);
  console.log(failedRequests);

  const occurrences = failedRequests.reduce(function (acc, curr) {
    return acc[curr[2]] ? ++acc[curr[2]] : acc[curr[2]] = 1, acc
  }, {});
  
  console.log(`Counting the Failed Requests per Endpoint (should be even numbers)`);
  console.log(`================================================================= `);
  console.log("Occurences : ", occurrences) 
};

main();
