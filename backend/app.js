const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const ejsMate= require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js")
const cookie = require("cookie-parser");
// passport
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const reviews = require("./routes/review.route.js");

const listings = require("./routes/listing.route.js")

const users = require("./routes/users.route.js");

const app = express();
//Connection
const MONGO_URL ="mongodb+srv://samuel:samuel123@cluster0.vm3ubz5.mongodb.net/Waderluster"

  wrapAsync(
    main().then(()=>{

        console.log("DB  connected Successfully");
    })
    .catch((err)=>{
        // next(new errorHandler(1006,"Internet Connection failled."));

        console.log("Internet Connection failled.");
    })

  )
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


//Session
const sessionOption = {
    secret:"test Code",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+2*24*60*60*1000,
        originalMaxAge:2*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
//authenticating user using passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //Storing user info in session
passport.deserializeUser(User.deserializeUser()); // removing user info from session






//Listing routes

app.use("/listings", listings);

//Review Route
app.use("/listings/:id/reviews",reviews)

//Signin Signup
app.use("/",users);


//Page not found
app.all("*",(req,res,next)=>{
    res.status(404).render("../utils/pageNotFound")
})
//Error Handler

app.use((err,req,res,next)=>{
   const {status=500,message="Something went wrong."} = err;

    res.status(status).send(err);
})

app.listen(8080,()=>{
console.log("Server is listening on port 8080");
})
