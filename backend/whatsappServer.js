const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const whatsappAdmin = require("./models/whatsappAdmin.js");
const whatsappContact = require("./models/whatsappContacts.js")
const whatsappMessage = require("./models/whatsappMessage.js");
const wrapAsync = require("./utils/wrapAsync.js")
const app = express();

const path = require("path")
const ejsMate= require("ejs-mate");
const methodOverride = require("method-override");

const cors = require("cors");
const bodyParser=require("body-parser");



//Connection
async function main(){
    await mongoose.connect(MONGO_URL);
}
const MONGO_URL ="mongodb+srv://samuel:samuel123@cluster0.vm3ubz5.mongodb.net/WhatsappMember"


    main().then(()=>{

        console.log("DB  connected Successfully");
    })
    .catch((err)=>{
        // next(new errorHandler(1006,"Internet Connection failled."));

        console.log("Internet Connection failled.");
    })

   

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.engine('ejs',ejsMate);
    app.use(express.static(path.join(__dirname,"public")));


    app.use(cors());
    app.use(bodyParser.json());
const sessionOption = 
    {
        secret:"test Code",
        resave:false,
        saveUninitialized:true,
       
    }

app.use(session(sessionOption));
app.get("/",(req,res)=>{
    
    res.send("Wellcome to Whatsapp admin");
})

app.get("/newuser",wrapAsync(async(req,res)=>{
    const users = await whatsappContact.find();
         res.send(users);
     // res.render("whatsapp/newUser.ejs");
 }))
app.post("/newuser",wrapAsync(async(req,res)=>{

    const {name,image,mobile} = req.body;
    const userExist = await whatsappContact.findOne({mobile:req.body.mobile})
    if(userExist){
        console.log("Number existed");
        res.status(409).send(userExist);
    }
   else{
    const newUser = new whatsappContact({
        name,
        image,
        mobile
    })
    await newUser.save();
    console.log("New contact Added");

   
    res.send("New contact Added");
   }
}))

//signup

// app.post("/signup",async(req,res)=>{
//     const {name,image,mobile} = req.body;

    
//     const newAdmin = new whatsappAdmin({
//         name,image,mobile
//     })
//    const newRegistation = await whatsappAdmin.register(newAdmin,password);

//    res.send("New Admin Registered Successfully");
    
// })
//Admin signup
app.post("/admin/signup",wrapAsync(async(req,res)=>{
    const {username,mobile,password}= req.body;
console.log(req.body);

    const userExist = await whatsappAdmin.findOne({mobile:req.body.mobile})
    if(userExist){
        res.status(409).send("Number is already used.");
    }
    else{
        const newUser = new whatsappContact({ name:username, mobile })
        const newAdmin = new whatsappAdmin({
            username,mobile,allContacts:newUser
        })
        //Contact Adding
       //Passsing ref of Contact
       
       //username and password
       const newRegistered = await whatsappAdmin.register(newAdmin,password);
    await newUser.save();
    res.send(newUser);
    }
}
))

//login using mobile number
app.post("/login",async(req,res)=>{
    const user = await whatsappContact.findOne({ mobile: req.body.mobile });
           
           if (user) {
              
               res.json(user);
           } else {
             res.status(404).json({ message: 'User not found' });
           }})


        // Error Handling
        app.use((err,req,res,next)=>{
            const {status=500,message="Something went wrong."} = err;
         
             res.status(status).send(err);
         })


app.listen(8080,()=>{
    console.log("Listening on port 8080");
})