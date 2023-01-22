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
    return response;
  } catch (errors) {
    console.log(`${colours.fg.red} Error: ${errors.response.status} ${colours.reset}`);
    return errors;
  }
};

const main = async () => {
  console.log(`${colours.fg.cyan}Retrieving Metadata + Pallets Indices`)
  console.log(`===================================== ${colours.reset}`)
  const metadata = await getData('/runtime/metadata')
  const pallets = metadata.data.metadata.v14.pallets;

  console.log(`${colours.fg.cyan}\nTesting Storage Endpoint for All Pallets`)
  console.log(`===================================== ${colours.reset}`)
  for (var i=0; i < pallets.length; i++) {
    process.stdout.write('pallet: ' + pallets[i]['index'] + " - " + pallets[i]['name'] + "\t\t ->  ")
    const errors = await getData('/pallets/' + pallets[i]['index'] + '/storage');
  }

  // console.log(`${colours.fg.cyan}\nTesting Errors Endpoint for All Pallets`)
  // console.log(`===================================== ${colours.reset}`)
  // for (var i=0; i < pallets.length; i++) {
  //   process.stdout.write('pallet: ' + pallets[i]['index'] + " - " + pallets[i]['name'] + "\t\t ->  ")
  //   const errors = await getData('/pallets/' + pallets[i]['index'] + '/errors')
  // }

};

main();
