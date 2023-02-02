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

const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}` + endpoint);
    console.log(`${colours.fg.green} Success: ${response.status} ${colours.reset}`);
    console.log(`${BASE_URL}${endpoint}`);
    return response;
  } catch (errors) {
    console.log(`${colours.fg.red} Error: ${errors.response.status} ${colours.reset}`);
    console.log(`${BASE_URL}${endpoint}`);
    return errors;
  }
};

const queryEndpoint = async (pallets, param, endpoint) => {
  console.log(`${colours.fg.cyan}\nTesting ${endpoint} Endpoint for All Pallets by pallet ${param}`);
  console.log(`==================================================================== ${colours.reset}`);
  for (var i=0; i < pallets.length; i++) {
    process.stdout.write(`Pallet Index: ${colours.fg.cyan}` + pallets[i]['index'] + `${colours.reset} - Pallet Name: ${colours.fg.cyan}` + pallets[i]['name'] + `${colours.reset}\t ->  `);
    const errors = await getData('/pallets/' + pallets[i][param] + `/${endpoint} \n`);
  }
}

const main = async () => {
  console.log(`${colours.fg.cyan}Retrieving Metadata + Pallets Indices`);
  console.log(`===================================== ${colours.reset}`);
  const metadata = await getData('/runtime/metadata');
  const pallets = metadata.data.metadata.v14.pallets;

  // STORAGE endpoint
  // Querying the storage endpoint for All Pallets by pallet INDEX
  const storageByIndex = await queryEndpoint(pallets, 'index', 'storage');

  // Querying the storage endpoint for All Pallets by pallet NAME
  const storageByName = await queryEndpoint(pallets, 'name', 'storage');

  // ERRORS endpoint
  // Querying the ERRORS endpoint for All Pallets by pallet INDEX
  const errorsByIndex = await queryEndpoint(pallets, 'index', 'errors');

  // Querying the EVENTS endpoint for All Pallets by pallet NAME
  const errorsByName = await queryEndpoint(pallets, 'name', 'errors');

  // EVENTS endpoint
  // Querying the events endpoint for All Pallets by pallet INDEX
  const eventsByIndex = await queryEndpoint(pallets, 'index', 'events');

  // Querying the events endpoint for All Pallets by pallet NAME
  const eventsByName = await queryEndpoint(pallets, 'name', 'events');
};

main();
