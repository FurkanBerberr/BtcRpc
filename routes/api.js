const express = require("express")
const router = express.Router()
const axios = require("axios")

const dotenv = require("dotenv")
dotenv.config()

const { createHash } = require('crypto')
const bs58 = require('bs58');

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const API_URL = `http://${USER}:${PASS}@192.168.1.76:5086`

const headers = {
    "content-type": "text/plain;"
}

//-------------FUNCTIONS--------------//

const hashSha256 = (ECDSAkey) => {
    hex_ECDSAkey = Buffer.from(ECDSAkey, 'hex')
    return createHash('sha256').update(hex_ECDSAkey).digest('hex')
}

const hashRipemd160 = (sha256Hash) => {
    sha256Hash = hashSha256(sha256Hash)
    hex_sha256Hash = Buffer.from(sha256Hash, 'hex')
    return createHash('ripemd160').update(hex_sha256Hash).digest('hex')
}

const Ripe160HashtoBase58 = (ripemd160hash) => {
    const prefix = '00' + ripemd160hash
    const hex_prefix = Buffer.from(prefix, 'hex')
    const hash1 = createHash('sha256').update(hex_prefix).digest()
    const hash2 = createHash('sha256').update(hash1).digest('hex')
    const checksum = hash2.slice(0, 8)
    const d = Buffer.from(prefix + checksum.toString('hex'), 'hex')
    const base58String = bs58.encode(d)
    return base58String
}

// Takes an id of a block and retuns hash of the block
const getBlockHash = async (id) => {
    let intId = parseInt(id)
    const data = {
        jsonrpc: "1.0",
        id: "curltext",
        method: "getblockhash",
        params: [intId]
    }

    const result = await axios.post(API_URL, data, { headers })
    return result.data.result
}

// Takes the hash of the block and retuns block info
const getBlock = async (hash) => {

    const data = {
        jsonrpc: "1.0",
        id: "curltext",
        method: "getblock",
        params: [hash]
    }

    const result = await axios.post(API_URL, data, { headers })
    return result.data
}

// Takes the transaction id and returns raw transaction data
const getRawTransaction = async (txId) => {
    const data = {
        jsonrpc: "1.0",
        id: "curltext",
        method: "getrawtransaction",
        params: [txId, true]
    }
    const result = await axios.post(API_URL, data, { headers })
    return result.data
}

//---------------ROUTES---------------//

// Check if the api works
router.get("/test", (req, res) => res.json({ msg: "niqo works" }))

// Example url that takes  Sigscript ASM as an input and returns address of the transaction
router.get("/hashfunction", (req, res) => {
    res.json({ msg: Ripe160HashtoBase58(hashRipemd160("0446ef0102d1ec5240f0d061a4246c1bdef63fc3dbab7733052fbbf0ecd8f41fc26bf049ebb4f9527f374280259e7cfa99c48b0e3f39c51347a19a5819651503a5")) })
})

var jsonResults = new Object()

router.get("/getblocks/:id", async (req, res) => {
    let blockHash = await getBlockHash(req.params.id)
    let blockInfo = await getBlock(blockHash)
    let blockCounter = 0
    for (let i = 0; i < 5; i++) {
        let blockTxArray = blockInfo.result.tx
        for (let j = 0; j < blockTxArray.length; j++) {
            const transaction = await getRawTransaction(blockTxArray[j])
            let data = {
                blockhash: blockInfo.result.hash,
                height: blockInfo.result.height,
                previousblockhash: blockInfo.result.previousblockhash,
                nextblockhash: blockInfo.result.nextblockhash,
                txid: transaction.result.txid,
                tx_hash: transaction.result.hash
            }

            if (Object.hasOwn(transaction.result.vin[0], "coinbase")) {
                data["is_coinbase"] = true
                data["coinbase"] = transaction.result.vin[0].coinbase
                data["from"] = "0000000000000000000000000000000000"
                data["to"] = Ripe160HashtoBase58(hashRipemd160(transaction.result.vout[0].scriptPubKey.asm.split(" ")[0]))
                data["amount"] = transaction.result.vout[0].value
            } else {
                console.log("_______________results", transaction.result)
                data["vin"] = {}
                data["vout"] = {}
                for (let k = 0; k < transaction.result.vin.length; k++) {
                    let vin_transaction = await getRawTransaction(transaction.result.vin[k].txid)
                    let vin_vout_value = transaction.result.vin[k].vout
                    let vin_info = {
                        txid: vin_transaction.result.txid,
                        hash: vin_transaction.result.hash,
                    }
                    if (Object.hasOwn(vin_transaction.result.vin[0], "coinbase")) {
                        vin_info["is_coinbase"] = true
                        vin_info["coinbase"] = vin_transaction.result.vout[vin_vout_value].coinbase
                        vin_info["from"] = "0000000000000000000000000000000000"
                        vin_info["to"] = Ripe160HashtoBase58(hashRipemd160(vin_transaction.result.vout[vin_vout_value].scriptPubKey.asm.split(" ")[0]))
                        vin_info["amount"] = vin_transaction.result.vout[vin_vout_value].value
                    } else {
                        vin_info["value"] = vin_transaction.result.vout[vin_vout_value].value,
                        vin_info["address"] = Ripe160HashtoBase58(hashRipemd160(vin_transaction.result.vout[vin_vout_value].scriptPubKey.asm.split(" ")[0]))
                    }
                    data["vin"][k] = vin_info
                }
                for (let h = 0; h < transaction.result.vout.length; h++) {
                    let vout_info = {
                        value: transaction.result.vout[h].value,
                        address: Ripe160HashtoBase58(hashRipemd160(transaction.result.vout[h].scriptPubKey.asm.split(" ")[0]))
                    }
                    data["vout"][h] = vout_info
                }
            }
            jsonResults[blockCounter++] = data
        }
        blockInfo = await getBlock(blockInfo.result.nextblockhash)

    }
    res.send(jsonResults)
})

router.get("/getrawtransaction/:txid", async (req, res) => {
    const transaction = await getRawTransaction(req.params.txid)
    res.send(transaction.result)
})

module.exports = router 