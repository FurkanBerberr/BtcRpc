## BTCRPC

- To start the projet firs type `yarn` on the console in order to download packages 
- Create .env file and  create veriables called `RPC_USER` and `RPC_PASSWORD`
- Assign the values from your bitcoin.conf file (you need to have Bitcoin Core)
- Make a request to http://localhost:6106/api/test to check everything is working
- Make a request to http://localhost:6106/api/getblocks/{*block number*}/{*how many block you want to search*} for example 
http://localhost:6106/api/getblocks/5/10 it start from 5th block and searches 10 block

output should look like this:
```json
{
    "0":{"blockhash":"000000009b7262315dbf071787ad3656097b892abffd1f95a1a022f896f533fc","height":5,"previousblockhash":"000000004ebadb55ee9096c9a2f8880e09da59c0d68b1c228da88e48844a1485","nextblockhash":"000000003031a0e73735690c5a1ff2a4be82553b2a12b776fbd3a215dc8f778d","txid":"63522845d294ee9b0188ae5cac91bf389a0c3723f084ca1025e7d9cdfe481ce1","tx_hash":"63522845d294ee9b0188ae5cac91bf389a0c3723f084ca1025e7d9cdfe481ce1","is_coinbase":true,"coinbase":"04ffff001d0120","from":"0000000000000000000000000000000000","to":"1JfbZRwdDHKZmuiZgYArJZhcuuzuw2HuMu","amount":50},
    
    "1":{"blockhash":"000000003031a0e73735690c5a1ff2a4be82553b2a12b776fbd3a215dc8f778d","height":6,"previousblockhash":"000000009b7262315dbf071787ad3656097b892abffd1f95a1a022f896f533fc","nextblockhash":"0000000071966c2b1d065fd446b1e485b2c9d9594acd2007ccbd5441cfc89444","txid":"20251a76e64e920e58291a30d4b212939aae976baca40e70818ceaa596fb9d37","tx_hash":"20251a76e64e920e58291a30d4b212939aae976baca40e70818ceaa596fb9d37","is_coinbase":true,"coinbase":"04ffff001d0123","from":"0000000000000000000000000000000000","to":"1GkQmKAmHtNfnD3LHhTkewJxKHVSta4m2a","amount":50},
    
    "2":{"blockhash":"0000000071966c2b1d065fd446b1e485b2c9d9594acd2007ccbd5441cfc89444","height":7,"previousblockhash":"000000003031a0e73735690c5a1ff2a4be82553b2a12b776fbd3a215dc8f778d","nextblockhash":"00000000408c48f847aa786c2268fc3e6ec2af68e8468a34a28c61b7f1de0dc6","txid":"8aa673bc752f2851fd645d6a0a92917e967083007d9c1684f9423b100540673f","tx_hash":"8aa673bc752f2851fd645d6a0a92917e967083007d9c1684f9423b100540673f","is_coinbase":true,"coinbase":"04ffff001d012b","from":"0000000000000000000000000000000000","to":"16LoW7y83wtawMg5XmT4M3Q7EdjjUmenjM","amount":50},

    "3":{"blockhash":"00000000408c48f847aa786c2268fc3e6ec2af68e8468a34a28c61b7f1de0dc6","height":8,"previousblockhash":"0000000071966c2b1d065fd446b1e485b2c9d9594acd2007ccbd5441cfc89444","nextblockhash":"000000008d9dc510f23c2657fc4f67bea30078cc05a90eb89e84cc475c080805","txid":"a6f7f1c0dad0f2eb6b13c4f33de664b1b0e9f22efad5994a6d5b6086d85e85e3","tx_hash":"a6f7f1c0dad0f2eb6b13c4f33de664b1b0e9f22efad5994a6d5b6086d85e85e3","is_coinbase":true,"coinbase":"04ffff001d012c","from":"0000000000000000000000000000000000","to":"1J6PYEzr4CUoGbnXrELyHszoTSz3wCsCaj","amount":50},
    
    "4":{"blockhash":"000000008d9dc510f23c2657fc4f67bea30078cc05a90eb89e84cc475c080805","height":9,"previousblockhash":"00000000408c48f847aa786c2268fc3e6ec2af68e8468a34a28c61b7f1de0dc6","nextblockhash":"000000002c05cc2e78923c34df87fd108b22221ac6076c18f3ade378a4d915e9","txid":"0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9","tx_hash":"0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9","is_coinbase":true,"coinbase":"04ffff001d0134","from":"0000000000000000000000000000000000","to":"12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S","amount":50},

    "5":{"blockhash":"000000002c05cc2e78923c34df87fd108b22221ac6076c18f3ade378a4d915e9","height":10,"previousblockhash":"000000008d9dc510f23c2657fc4f67bea30078cc05a90eb89e84cc475c080805","nextblockhash":"0000000097be56d606cdd9c54b04d4747e957d3608abe69198c661f2add73073","txid":"d3ad39fa52a89997ac7381c95eeffeaf40b66af7a57e9eba144be0a175a12b11","tx_hash":"d3ad39fa52a89997ac7381c95eeffeaf40b66af7a57e9eba144be0a175a12b11","is_coinbase":true,"coinbase":"04ffff001d0136","from":"0000000000000000000000000000000000","to":"15yN7NPEpu82sHhB6TzCW5z5aXoamiKeGy","amount":50},

    "6":{"blockhash":"0000000097be56d606cdd9c54b04d4747e957d3608abe69198c661f2add73073","height":11,"previousblockhash":"000000002c05cc2e78923c34df87fd108b22221ac6076c18f3ade378a4d915e9","nextblockhash":"0000000027c2488e2510d1acf4369787784fa20ee084c258b58d9fbd43802b5e","txid":"f8325d8f7fa5d658ea143629288d0530d2710dc9193ddc067439de803c37066e","tx_hash":"f8325d8f7fa5d658ea143629288d0530d2710dc9193ddc067439de803c37066e","is_coinbase":true,"coinbase":"04ffff001d013b","from":"0000000000000000000000000000000000","to":"1dyoBoF5vDmPCxwSsUZbbYhA5qjAfBTx9","amount":50},
    
    "7":{"blockhash":"0000000027c2488e2510d1acf4369787784fa20ee084c258b58d9fbd43802b5e","height":12,"previousblockhash":"0000000097be56d606cdd9c54b04d4747e957d3608abe69198c661f2add73073","nextblockhash":"000000005c51de2031a895adc145ee2242e919a01c6d61fb222a54a54b4d3089","txid":"3b96bb7e197ef276b85131afd4a09c059cc368133a26ca04ebffb0ab4f75c8b8","tx_hash":"3b96bb7e197ef276b85131afd4a09c059cc368133a26ca04ebffb0ab4f75c8b8","is_coinbase":true,"coinbase":"04ffff001d010c","from":"0000000000000000000000000000000000","to":"1PYELM7jXHy5HhatbXGXfRpGrgMMxmpobu","amount":50},

    "8":{"blockhash":"000000005c51de2031a895adc145ee2242e919a01c6d61fb222a54a54b4d3089","height":13,"previousblockhash":"0000000027c2488e2510d1acf4369787784fa20ee084c258b58d9fbd43802b5e","nextblockhash":"0000000080f17a0c5a67f663a9bc9969eb37e81666d9321125f0e293656f8a37","txid":"9962d5c704ec27243364cbe9d384808feeac1c15c35ac790dffd1e929829b271","tx_hash":"9962d5c704ec27243364cbe9d384808feeac1c15c35ac790dffd1e929829b271","is_coinbase":true,"coinbase":"04ffff001d013c","from":"0000000000000000000000000000000000","to":"17abzUBJr7cnqfnxnmznn8W38s9f9EoXiq","amount":50},
    
    "9":{"blockhash":"0000000080f17a0c5a67f663a9bc9969eb37e81666d9321125f0e293656f8a37","height":14,"previousblockhash":"000000005c51de2031a895adc145ee2242e919a01c6d61fb222a54a54b4d3089","nextblockhash":"00000000b3322c8c3ef7d2cf6da009a776e6a99ee65ec5a32f3f345712238473","txid":"e1afd89295b68bc5247fe0ca2885dd4b8818d7ce430faa615067d7bab8640156","tx_hash":"e1afd89295b68bc5247fe0ca2885dd4b8818d7ce430faa615067d7bab8640156","is_coinbase":true,"coinbase":"04ffff001d013e",  "from":"0000000000000000000000000000000000","to":"1DMGtVnRrgZaji7C9noZS3a1QtoaAN2uRG","amount":50}
}

```