### `acala.txt`:
- 5089947 1 Horizontal Message
- 5003782 1 Horizontal Message
- 5003527 1 Horizontal Message
- 4874239 1 Horizontal Message
- 4874095 1 Horizontal Message
- 4851082 1 Horizontal Message
- 4829941 1 Horizontal Message

### `astar.txt`:
- Block 5235919 Should show 1 Horizontal Message - [XCM Msg in Subscan](https://astar.subscan.io/xcm_message/polkadot-ea10bb49b934a1c72feee1cee1679ece7a5680b3)
- Block 4733673 has 1 Horizontal Message from paraId=2030

### `basilisk.txt`:
#### NOT SUPPORTED
- 4783506 1 Horizontal Message from paraId=1000
- 4086818 1 Horizontal Message from paraId=2048
- 2114661 1 Horizontal Message from paraId=2000
- 2062077 1 Horizontal Message from paraId=2000

### `bifrost.txt`:
- Block 1148216 Should show 1 Downward Message - [XCM Msg in Subscan](https://bifrost.subscan.io/xcm_message/polkadot-80213667df835dcaa1803d32dd13de461b3f68a0)

### `kusama.txt` :
- Block 20482489 has 1 Upward Message from paraId=2000
- Block 20447643 has 2 Upward Messages:
    - one from paraId=2001
    - one from paraId=2110
- Block 20402870 has 1 Upward Message from paraId=2000
- Block 10419024 has 1 Upward Message from paraId=2001 - [Block #10419024 in Subscan](https://kusama.subscan.io/block/10419024)
- Block 12335217 has 1 Upward Message from paraId=2023 - [Block #12335217 in Subscan](https://kusama.subscan.io/block/12335217)

### Kusama `in transit` messages:
#### Cases tested
- Blocks with 1 Horizontal Message
- Blocks with 1 Horizontal and 1 Upward Message
- Blocks with 2 Horizontal Messages from same ParaId
- Block with 2 Horizontal Messages from different ParaIds

#### Cases
- Block [22043234](https://kusama.subscan.io/block/22043234) has:
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-87db5340cd4146c9a5448120171a7eabaca0f2af) Message from Bifrost (paraId: `2001`) through Kusama to Moonriver (paraId: `2023`)
- Block [22019558](http://127.0.0.1:8080/blocks/22019558?decodedXcmMsgs=true) has:
    - 1 [Upward](https://kusama.subscan.io/xcm_message/kusama-efee389cfa31b4ab1fe3889f383bc745c93cd8dc) Message from Bifrost (paraId: `2001`) to Kusama Relay
        - Block [22019560](https://kusama.subscan.io/extrinsic/22019560-0?event=22019560-3) msg `processed`
        - Block [22019558](https://kusama.subscan.io/block/22019558) msg `sent`
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-a27d1d5950efa99df547f0d7ecd93b39844f5dbd) Message from Basilisk (paraId: `2090`) through Kusama to Robonomics (paraId: `2048`)
        - Block 22019559
        - Block [22019558](https://kusama.subscan.io/block/22019558) msg `sent`
    - We can cross check that its the same msgs by looking at their IDs
- Block [21118039](https://kusama.subscan.io/block/21118039) has:
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-cd727bd9ebe926632b65a8c025889d4f1c21895c) Message from Asset Hub (paraId: `1000`) through Kusama to Mangata (paraId: `2110`)
- Block [15121294](https://kusama.subscan.io/block/15121294) has:
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-2c11fd6c4c065cf05a6aed97f8f7fca40345fca9) Message from Khala (paraId: `2004`) through Kusama to Parallel Heiko (paraId: `2085`)
- Block [18872451](https://kusama.subscan.io/block/18872451) has:
    - 2 Horizontal Messages from Turing (paraId: `2114`):
        - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-9dfc86dc1cce8db554c4de25061cbf929215364c) Message to Shiden (paraId: `2007`)
        - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-26c0765aa7c73cff4781ae58e0d6126ff56059ce) Message to Mangata (paraId: `2110`)
        - subscan [page](https://kusama.subscan.io/xcm_message?page=2365&time_dimension=date&protocol=HRMP&afterId=a82f6d7c8545fd21b820317085e1a5f3c2accf06) - `2023-07-20 16:00:18`
        - ❗2nd Horizontal Msg in Sidecar has 3 calls
- Block [16703062](https://kusama.subscan.io/block/16703062) has:
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-34e3727c13741018af20b0c0923f7294f635a6be) Message from Bifrost Kusama (paraId: `2001`) to Moonriver (paraId: `2023`)
    - ❗Sidecar [16703062](http://127.0.0.1:8080/blocks/16703062?decodedXcmMsgs=true) 1 Horizontal Msg with 2 calls
    - Subscan [page](https://kusama.subscan.io/xcm_message?page=4169&time_dimension=date&protocol=HRMP&afterId=c6f5fe667c69be12389b385e319a62553d24c744) - `2023-02-19 11:14:18`
- Block [21340597](https://kusama.subscan.io/block/21340597)
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-cf4b938b4a470631a6b608cf83480e804ad27f04) Message from Bifrost to Moonriver
    - Subscan [page](https://kusama.subscan.io/xcm_message?page=933&time_dimension=date&afterId=2864f2d212c44ba9a584b2f7662efd1b01f06374) shows 2 transfers at the same time: [1](https://kusama.subscan.io/xcm_message/kusama-87c8be67ba53fae8e76e6b778e0eed431b078d6c), [2](https://kusama.subscan.io/xcm_message/kusama-cf4b938b4a470631a6b608cf83480e804ad27f04) - `2024-01-08 09:05:00` 
- Block [18292635](https://kusama.subscan.io/block/18292635) has:
    - 1 [Upward](https://kusama.subscan.io/xcm_message/kusama-090bdf664a416130cf2d17b5889d77ccadf29112) Message from paraId: 2087
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-41f426cde2d90a52333e0be0bd902a384dc11fec) Message from 2087 to 1000
    - subscan [page](https://kusama.subscan.io/xcm_message?page=5932&time_dimension=date&afterId=cc8d6c2b9e56d673770b0dda2b307b4fc9536ff6) - `2023-06-10 06:53:48`
- Block [17792973](https://kusama.subscan.io/block/17792973) has:
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-e0344f992ebcb850adf83f974f147a1ebaca1c56) message from para 2084 to para 2000
    - 1 [Horizontal](https://kusama.subscan.io/xcm_message/kusama-bbfde9b1343d967cd56539db28ace7fc098283c6) message from 2110 to 2114
    - subscan [page](https://kusama.subscan.io/xcm_message?page=3501&time_dimension=date&afterId=e2e95b97060abf986e9a1dc16aaed639d2cb508e&protocol=HRMP) `2023-05-06 10:47:37`
    - ❗Sidecar only shows one

### `kusama-asset-hub.txt` :
- Block 6202603 Should show 2 Horizontal Messages, 1 from paraId=2087 and 1 from paraId=2110 - [XCM msgs in Block](https://assethub-kusama.subscan.io/block/6202603)
- Block 5860600 has a SetTopic instruction
- Block 3519435 has 1 Horizontal Message from para=2023
- Block 3356317 has:
    - 1 Downward 
    - 1 Horizontal Message from para=2085
- Block 3356306 has Downward and Horizontal Messages
- Block 3356247 has 1 Downward and 1 Horizontal Message from para=2085
- Block 3356206 has:
    - 1 Downward Message
    - 1 Horizontal Message from paraId=2085
- Block 3356195 has Downward and Horizontal Messages from paraId = 2085
- Block 3472032 has 1 Horizontal Message from paraId=2087
- Block 3222069 has 1 Downward Message and 1 Horizontal Message from paraId=2000
- In range of blocks 3348590-3348990 there are approx 10xcm

### `manta.txt`:
- Block 1076772 Should show 1 Horizontal Message from paraId=2000 - [XCM Msg](https://manta.subscan.io/xcm_message/polkadot-ee05ab9fb1cb8726d2c679f4fe6d1a8daf25d073)
- Block 995092 1 Horizontal msg - [Subscan link](https://manta.subscan.io/xcm_message/polkadot-32df782feb7b173cec23ac87faf716f621939e74)
- Block 772956 1 Horizontal Message from paraId=2000 - [XCM Msg](https://manta.subscan.io/xcm_message/polkadot-5cba01f91704512f8a0d80bb033b70691f6cd228)

### `moonbeam.txt`:
#### NOT SUPPORTED - An extra package needs to be added to Sidecar.
- Block 5023470 Should show 1 Horizontal Message from paraId=2092
- Block 4967607 has an error - Should show 2 Horizontal Messages, 1 from paraId=2034 and 1 from paraId=2035
- Block 4934914 Should show 1 Horizontal Message from paraId=2031
- Block 4918644   - [XCM Msg](https://moonbeam.subscan.io/xcm_message/polkadot-000d5c572f36a0b347782060709a7085c1615235)
- Block 4865584 has an error - Should show 1 Horizontal Message from paraId=2032
- Block 4865398 has an error - Should show 1 Horizontal Message from paraId=2030
- Block 4337585 Should show 1 Horizontal Message from paraId=2104

    `error`:
    ```
    createType(XcmVersionedXcm):: DoNotConstruct: Cannot construct unknown type XcmVersionedXcm
    ```

### `polkadot.txt` :
- Block 18468942 has 2 Upward Messages, 1 from paraId=2000, 1 from paraId=2012
- Block 18462413 has 2 Upward Messages
- Block 18296788 has 1 Upward Message for paraId=2004 Moonbeam

### `polkadot-asset-hub.txt` :
- Block 5154532 has 1 Horizontal Message
- Block 4413420 has 1 Horizontal Message
- Block 4398301 has 2 Horizontal Messages, 1 from para=2006 and 1 from para=2034
- Block 4362190 has 1 Downward Message
- Block 4097739 has 1 Horizontal Message from paraId=2034
- Block 3999186 has 1 Horizontal Message
- Block 2406353 has 1 Downward Message
- Block 2372744 has 1 Downward (receiveTeleportedAsset) and 1 Horizontal Messages
- Block 1212484 has 1 Downward Message

### `robonomics.txt`:
- Block 4410728 1 Horizontal Message from paraId=2090 - [XCM Msg](https://robonomics.subscan.io/xcm_message/kusama-2ae9667fcd6b8790a25b89191ba2a1c30ebdfaa5)
- Block 3037322 1 Horizontal Message from paraId=2023 - [XCM Msg](https://robonomics.subscan.io/xcm_message/kusama-6778de8215d241ae3f85cb5a56edb88b570144e0)

### `westend-asset-hub.txt` :
- Block 6163212 has 1 Horizontal Message from paraId=1002 - [Event #6163213-3 in Statescan](https://westmint.statescan.io/#/events/6163213-3)
- Block 6154690 has 1 Downward Message - [Event #6154691-3 in Statescan](https://westmint.statescan.io/#/events/6154691-3)
- Block 6069373 has 1 Downward Message - [Event #6069374-6 in Statescan](https://westmint.statescan.io/#/events/6069374-6)
- Block 5923487 has 1 Downward Message - [Event #5923487-3 in Statescan](https://westmint.statescan.io/#/events/5923487-3)
- Block 5833384 has 1 Horizontal Message from paraId=1002 - [Event #5833385-3 in Statescan](https://westmint.statescan.io/#/events/5833385-3)
- Block 5821862 has 1 Horizontal Message from paraId=1002 - [Event #5821863-26 in Statescan](https://westmint.statescan.io/#/events/5821863-26)
