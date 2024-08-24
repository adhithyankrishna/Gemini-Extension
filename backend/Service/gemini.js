const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model =  genAI.getGenerativeModel({ model: "gemini-1.5-flash"});




const gen = (promt)=>{
    return new Promise((resolve,reject)=>{
       
        const stream = model.generateContentStream({promt});

        stream.on(data,(chunk)=>{
            onformdata(chunk.text);
        })

        stream.end('end',()=>{
            resolve();
        })
        stream.on("error",(error)=>{
            reject(error)
        })
    })
}

module.exports  = gen;