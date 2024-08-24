const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run (message){
    console.log(message+" "+process.env.API_KEY);

    
    const result = await model.generateContent(message);
    //console.log(result);
    const response  = result.response;

    //console.log(response);
    const text = response.text();
    console.log(text);

}

run("what is tell what . env file why it use full ");