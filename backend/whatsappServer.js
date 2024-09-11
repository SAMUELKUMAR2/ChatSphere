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
const whatsappContacts = require("./models/whatsappContacts.js");



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

 //login using mobile number
app.post("/login",async(req,res)=>{
    const user = await whatsappAdmin.findOne({ mobile: req.body.mobile });
           
           if (user) {
              
               res.json(user);
           } else {
             res.status(404).json({ message: 'User not found' });
           }})


     

//Admin signup
app.post("/admin/signup",wrapAsync(async(req,res)=>{
    const {username,mobile,image,password}= req.body;


    const userExist = await whatsappAdmin.findOne({mobile:req.body.mobile})
    if(userExist){
        res.status(409).send("Number is already used.");
    }
    else{
       
        const newAdmin = new whatsappAdmin({
            username,mobile,image
        })
 //username and password
       const newRegistered = await whatsappAdmin.register(newAdmin,password);
    
    res.send(newAdmin);
    }
}
))

// display All Contacts
app.get("/admin/:id",wrapAsync(async(req,res)=>{
    
    const userInsideAdmin = await whatsappAdmin.findById(req.params.id).populate("allContacts");
    // const users = await whatsappContact.find();
    //      res.send(users);
  
    res.send(userInsideAdmin);
     // res.render("whatsapp/newUser.ejs");
 }))

// Adding New Contact
app.post("/admin/:id/newuser", wrapAsync(async (req, res) => {
    try {
        const {  mobile } = req.body;
        const currentAdmin = await whatsappAdmin.findById(req.params.id).populate("allContacts");
    console.log("current =", currentAdmin.allContacts.mobile);
        const userExist = await whatsappContact.findOne({ mobile });
        
        
        if (userExist) {
            console.log("mobile Number is Already Added");
            return res.status(409).send(userExist);
        }

        //Data of Existing Admin by mobile
        const NewUserData = await whatsappAdmin.findOne({mobile});
        
        //Data of Current Admin  
        const Admin = await whatsappAdmin.findById(req.params.id);
        if (!Admin) {
            console.error("Mobile Number not found for ID:", req.params.id);
            return res.status(404).send("Mobile Number not found");
        }
        
        const newUser = new whatsappContact({
            username:NewUserData.username,
           image:NewUserData.image,
           mobile
        });
         

    //   await  Admin.allContacts.push(newUser);
    //     await newUser.save();
    //     await Admin.save();
    //     await NewUserData.save();

       
        res.send("New contact added successfully");
    } catch (err) {
        console.error("Error during adding new contact:", err);
        res.status(500).send("Internal Server Error");
    }
}));

// Get All Message
app.get('/admin/:id/messages',  async (req, res) => {
 const AllMessages = await whatsappContact.findById(req.params.id).populate("messages");
 
 res.send(AllMessages);
});
// Send Message
app.post('/admin/:id/messages', wrapAsync(
    async (req, res) => {
        const { senderMobile,receiverMobile, message } = req.body;
        const receiverDetail = await whatsappContacts.findOne({ mobile: receiverMobile });
        const senderDetail = await whatsappContacts.findOne({mobile:senderMobile})
        if (!receiverDetail) return res.status(400).send('Receiver not found');
        
        const newMessage = new whatsappMessage({
            senderId: req.params.id,
            receiverId: receiverDetail._id,
            message,
        });
        receiverDetail.messages.push(newMessage);
        senderDetail.messages.push(newMessage);
        await receiverDetail.save();
        await senderDetail.save();
        await newMessage.save();
       
        res.status(201).send(receiverDetail);
    }
));

   // Error Handling
   app.use((err,req,res,next)=>{
    const {status=500,message="Something went wrong."} = err;
 
     res.status(status).send(err);
 })

app.listen(8080,()=>{
    console.log("Listening on port 8080");
})