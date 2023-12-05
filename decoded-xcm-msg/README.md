## Testing Sidecar's Blocks Endpoints
Script that queries Sidecar's `blocks` endpoints and retrieves the decoded XCM messages found.

### Prerequisites
- Have a sidecar instance running locally connected to the chain we would like to retrieve the XCM messages from.

### How to run
- `cd testing-xcm`
- We give one of the following commands depending on the chain we would like to test:
    - For Polkadot chain, we give `node xcmMsgs.js polkadot`
    - For Kusama chain, we give `node xcmMsgs.js kusama`
    - For Kusama Asset Hub chain, we give `node xcmMsgs.js kah`
    - For Polkadot Asset Hub chain, we give `node xcmMsgs.js pah`