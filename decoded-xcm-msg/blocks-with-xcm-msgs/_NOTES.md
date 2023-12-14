In `polkadot-asset-hub.txt` :
- Block 5154532 has 1 Horizontal Message
- Block 4413420 has 1 Horizontal Message
- Block 4398301 has 2 Horizontal Messages, 1 from para=2006 and 1 from para=2034
- Block 4362190 has 1 Downward Message
- Block 4097739 has 1 Horizontal Message from paraId=2034
- Block 3999186 has 1 Horizontal Message
- Block 2406353 has 1 Downward Message
- Block 2372744 has 1 Downward (receiveTeleportedAsset) and 1 Horizontal Messages
- Block 1212484 has 1 Downward Message

In `kusama-asset-hub.txt` :
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

In `polkadot.txt` :
- Block 18468942 has 2 Upward Messages, 1 from paraId=2000, 1 from paraId=2012
- Block 18462413 has 2 Upward Messages
- Block 18296788 has 1 Upward Message for paraId=2004 Moonbeam

In `kusama.txt` :
- Block 20482489 has 1 Upward Message from paraId=2000
- Block 20447643 has 2 Upward Messages:
    - one from paraId=2001
    - one from paraId=2110
- Block 20402870 has 1 Upward Message from paraId=2000

In `astar.txt`:
- Block 4733673 has 1 Horizontal Message from paraId=2030

In `acala.txt`:
- 5089947 1 Horizontal
- 5003782 1 Horizontal
- 5003527 1 Horizontal
- 4874239 1 Horizontal
- 4874095 1 Horizontal
- 4851082 1 Horizontal
- 4829941 1 Horizontal

In `basilisk.txt`:
- 4783506 1 Horizontal from paraId=1000
- 4086818 1 Horizontal from paraId=2048
- 2114661 1 Horizontal from paraId=2000
- 2062077 1 Horizontal from paraId=2000

In `manta.txt`:
- Block 1076772 Should show 1 Horizontal Message from paraId=2000 - [XCM Msg](https://manta.subscan.io/xcm_message/polkadot-ee05ab9fb1cb8726d2c679f4fe6d1a8daf25d073)
- Block 772956 1 Horizontal Message from paraId=2000 - [XCM Msg](https://manta.subscan.io/xcm_message/polkadot-5cba01f91704512f8a0d80bb033b70691f6cd228)

In `robo.txt`:
- Block 4410728 1 Horizontal Message from paraId=2090 - [XCM Msg](https://robonomics.subscan.io/xcm_message/kusama-2ae9667fcd6b8790a25b89191ba2a1c30ebdfaa5)
- Block 3037322 1 Horizontal Message from paraId=2023 - [XCM Msg](https://robonomics.subscan.io/xcm_message/kusama-6778de8215d241ae3f85cb5a56edb88b570144e0)

In `moonbeam.txt` :
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