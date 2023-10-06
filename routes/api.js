const express = require("express")
const router = express.Router()
const axios = require("axios")
var request = require("request")

const dotenv = require("dotenv")
dotenv.config()

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD

const headers = {
    "content-type": "text/plain;"
}

router.get("/test", (req, res) => res.json({ msg: "backend works" }))

router.get("/getblockcount", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})

router.get("/getbestblockhash", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getbestblockhash","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})

router.get("/getconnectioncount", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getconnectioncount","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})

router.get("/getdifficulty", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getdifficulty","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})


router.get("/getblockchaininfo", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})

router.get("/getmininginfo", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmininginfo","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})

router.get("/getpeerinfo", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getpeerinfo","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})

router.get("/getrawmempool", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawmempool","params":[]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
})
/* 
router.get("/getblockhash/:index", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${
        req.params.index
    }]}`
    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
}) */
/* 
router.get("/getblock/:hash", (req, res) => {
    var dataString = `{"jsonrpc":"2.0","id":"curltext","method":"getblock","params":[${
        req.params.hash
    }]}`

    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
}) */



const hashData = []
const blockData = []

router.get("/getblockhash/:index", async (req, res) => {
    const endIndex = parseInt(req.params.index)

    const apiUrl = `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`

    console.time("getblockhash")

    for(let i = 0; i < endIndex; i++){
        const data = {
            jsonrpc: "1.0",
            id: "curltext",
            method: "getblockhash",
            params: [i]
        }

        await axios.post(apiUrl, data, {headers}).then(response => {
            hashData.push(response.data.result)
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('An error occurred');
        })
    }
    console.timeEnd("getblockhash");
    console.log(`response data: ` + hashData)
    res.send(hashData)
})

router.get("/getblock", async(req, res) => {
    const apiUrl = `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`

    console.time("getBlock")

    for(let i = 0; i < hashData.length; i++){
        const data = {
            jsonrpc: "1.0",
            id: "curltext",
            method: "getblock",
            params: [String(hashData[i])]
        }

        await axios.post(apiUrl, data, {headers}).then(response => { 
            blockData.push(response.data)
        }).catch(error =>{
            console.log(error)
            res.status(500).send('error occurred')
        })
    }
    console.log("GetBlock")
    res.send(blockData)
})


router.get("/getrawtransaction/:txhash", async (req, res) => {
    const apiUrl = `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`

    const data = {
        jsonrpc:"1.0",
        id: "curltext",
        method: "getrawtransaction",
        params: [req.params.txhash]
    }


    await axios.post(apiUrl, data, {headers}).then(response => {
        res.send(response.data)
    })

    
})

/* router.get("/getrawtransaction/:hash", (req, res) => {
    var dataString = `{"jsonrpc":"2.0","id":"curltext","method":"getrawtransaction","params":[${
        req.params.hash
    }]}`

    var options = {
        url: `https://${USER}:${PASS}@266a-24-133-20-149.ngrok-free.app`,
        method: "POST",
        headers: headers,
        body: dataString
    }

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.send(data)
        }
    }
    request(options, callback)
}) */


module.exports = router