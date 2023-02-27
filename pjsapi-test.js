const { ApiPromise, WsProvider } = require('@polkadot/api');

const main = async () => {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  console.log(Object.keys(api.tx).length);
  const pallets = Object.keys(api.tx);
  const storage = Object.keys(api.query);
  // console.log(api.query);
  console.log("Pallets ");
  console.log(Object.keys(api.tx));

  console.log("Staking Extrinsics : " + Object.keys(api.tx.staking).length);
  console.log("parainclusion ");
  console.log(Object.keys(api.tx.paraInclusion));
  console.log("parainherent " + Object.keys(api.tx.paraInherent));
  console.log(Object.keys(api.tx.indices));
  console.log(Object.keys(api.tx.multisig));
  console.log(Object.keys(api.tx.technicalMembership));
// console.log(Object.keys(api.tx.AuthorityDiscovery));
// console.log(api.query.authorityDiscovery.keys);
// console.log(api.query.authorship.author);
}

main().catch(console.error).finally(() => process.exit());