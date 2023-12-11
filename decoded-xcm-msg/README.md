## Testing Sidecar's Blocks Endpoints
Script that queries Sidecar's `blocks` endpoints and retrieves the decoded XCM messages found.

### Prerequisites
- Have a sidecar instance running locally connected to the chain we would like to retrieve the XCM messages from.

### How to run
- We run the script with the command  `node xcmMsgs.js {CHAIN}`
- We replace `{CHAIN}` with one of the following :
    - `polkadot`: for Polkadot chain
    - `kusama`: for Kusama chain
    - `kah`: for Kusama Asset Hub chain
    - `pah`: for Polkadot Asset Hub chain

  depending on the chain we would like to test each time.

### Notes
- Check in `/blocks-with-xcm-msgs/` to find a file with test blocks for each chain.
- Check in `/blocks-with-xcm-msgs/_notes` to see what type of messages are expected in each test block.