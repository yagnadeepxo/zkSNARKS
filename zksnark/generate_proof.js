const { createHash } = require('crypto');
var bodyParser = require('body-parser');
const snarkjs = require('snarkjs');
const express = require('express');
const fs = require('fs')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.listen('3000',()=>{
    console.log("server up n listening")
})


function Ts(){
    return timestamp = Date.now().toString();
}

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:'views'});
})


app.post('/', async (req, res) => {
    const age = req.body.age;
    const hash = Ts();

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { 
            "age": age,  
            "salt": hash
        }, 
        "circuit_js/circuit.wasm", 
        "circuit_0000.zkey"
    );
    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
    const result = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    if (result === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }
});








