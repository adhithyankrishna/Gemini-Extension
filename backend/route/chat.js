const express= require("express");
const gen = require("../Service/gemini");
const chat = express.Router();



chat.post("/getResponse",(req,res)=>{
   const prompt  = req.body["prompt"];
    if (prompt){
        gen(prompt).then((data)=>{
            console.log(data);
            res.status(200).json({response:data});
        }).catch((error)=>{
            res.status(500).send(error);
        })
    }
    else{
        res.status(400).send({"Error":"Empty body"})
    }
})

module.exports = chat;