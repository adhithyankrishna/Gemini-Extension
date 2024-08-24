const express = require("express");
const cors = require("cors");
const port = 5000;
const auth = require("./route/authroute");
const session  = require("express-session");
const passport = require("passport");
const chat = require("./route/chat");


const app = express();

app.use(express.json());

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow all headers
    credentials: true // Allow credentials if needed
};

app.use(cors(corsOptions));


app.use(session({
    secret: "iamironman",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure: true if using HTTPS
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use("/genchat",auth);
app.use("/genchat",chat)




app.listen(port,()=>{
    console.log("app is listenign");
})