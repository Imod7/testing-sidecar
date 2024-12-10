## Testing Sidecar's Blocks Endpoints
Script that queries Sidecar's `blocks` endpoints and retrieves performance metrics.

### Prerequisites
- Have `nodejs` installed.
- Install axios: `npm install axios`.
- Have a sidecar instance cloned from the repo [substrate-api-sidecar-with-measuring](https://github.com/Imod7/substrate-api-sidecar-with-measuring) running locally (in a separate terminal).
  - Right now you need to checkout in the branch `domi-add-execution-times` with the command: `git checkout domi-add-execution-times`
  - The sidecar instance should be connected to the chain we would like to retrieve the metrics from.
  - You can find the corresponding `.env` file needed for your sidecar instance in the folder `./env-files` in the current directory.

### How to run
- Clone the repo, `testing-sidecar`
- Go into the corresponding folder : `cd sidecar-performance`
- Run the script with the command  `node performance.js {CHAIN} {STARTBLOCK-ENDBLOCK}`
- Replace `{CHAIN}` with the name of the chain, e.g. :
    - `polkadot`: for Polkadot Relay chain
- Replace `{STARTBLOCK-ENDBLOCK}` with a block range. Examples from Polkadot chain:
    - `23527940-23527986` (22/11)
        - total # of blocks: 47
        - avg # of extrinsics: 2737
        - avg # of events: 19185
    - `23528139-23528171`
      - total # of blocks: 33 
      - avg # of extrinsics:: 2921
      - avg # of events: 20478
    - `23528401-23528418`
        - total # of blocks: 18
        - avg # of extrinsics: 3740
        - avg # of events: 26207
    - `23528461-23528626` (22/11)
        - total # of blocks: 166
        - avg # of extrinsics: 2870
        - avg # of events: 20121
    - `23528882-23528945` (22/11)
        - total # of blocks: 64
        - avg # of extrinsics: 3002
        - avg # of events: 21045
    - `23565143-23565307`
        - total # of blocks: 165
        - avg # of extrinsics: 894
        - avg # of events: 6299
    - `23565320-23565494` (25/11)
        - total # of blocks: 175
        - avg # of extrinsics: 1194
        - avg # of events: 8396
    - `23565511-23565694` (25/11)
        - total # of blocks: 184
        - avg # of extrinsics: 1490
        - avg # of events: 10469
- Example command: `node performance.js polkadot {STARTBLOCK-ENDBLOCK}`

### Example on How to Use & Test
- Open one terminal and run sidecar connected to `polkadot` (using .env file `/env-files/.env.polkadot`) with the command 
  ```
  NODE_ENV=polkadot yarn start
  ```
- Open a second terminal and go into this repository and follow the steps on the `How to run` section.
  - The command to run in the 2nd terminal should be for kusama so:
    ```
    node performance.js polkadot 23528139-23528171
    ```
  - The output should be :

    ![Performance Stats](./performanceMetrics.png)


### Notes
- The results are also saved in `output.txt`. Each line in the file represents the metrics for a specific block.