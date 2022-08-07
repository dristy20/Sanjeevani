
const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require("mongoose");
const res = require('express/lib/response');
const validate = require('mongoose-validator');

const app= express();
app.use(bodyParser.urlencoded({extended:true}) );
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://dristy:123drish@cluster0.qkgp8.mongodb.net/HospitalDB",{useNewUrlParser:true});
//mongoose.connect("mongodb://localhost:27017/HospitalDB", {useNewUrlParser:true} );

//appointment 
const appointSchema=new mongoose.Schema({
    Name:{type:String , required:[true , "enter your name"] , minlength:3 },

    Contact:{type:String , required:[true ,"enter your contact"] , 
       validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); },
        message: props => `${props.value} put contact as 202-301-1267`} },

    Email:{type:String , required:[true,"enter your email"] , 
    validate: { validator : function(email){ return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);},
    message: props => `${props.value} put valid email` } },

    Address:{type:String , required:[true ,"enter your address"] },
    Date:{ type:Date , required:[true ,"enter the date"] },
    Mhistory:{type:String , required:[true ,"Have to enter details here"] }
});

const appointment= mongoose.model("Appointment",appointSchema);  //collection

app.get('/appointment',function(request,response)
{response.sendFile(__dirname + '/appointment.html');} );    //Get route

app.post('/appointment', function(request,response){
  const Uname= request.body.name;
  const Ucontact=request.body.contact;
  const Uemail=request.body.email;
  const Uaddress=request.body.address;
  const Udate=request.body.date;
  const Uhistory=request.body.history;

  const UserData= new appointment({
      Name:Uname,
      Contact:Ucontact,
      Email:Uemail,
      Address:Uaddress,
      Date:Udate,
      Mhistory:Uhistory
   })
   UserData.save();
   response.send("UserData saved Successfully...");
   //response.redirect("/appointment")
});

//Donation 
const donateSchema=new mongoose.Schema({
    Name:{type:String , required:[true , "enter your name"], minlength:3 },

    Contact:{type:String , required:[true ,"enter your contact"] , 
       validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); },
        message: props => `${props.value} put contact as 202-301-1267`} },

    Email:{type:String , required:[true,"enter your email"] , 
    validate: { validator : function(email){ return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);},
    message: props => `${props.value} put valid email` } },

    Address:{type:String , required:[true ,"enter your address"]},
    Donate:{ type:String , enum: ['Tablets', 'Syrup', 'Medical Kit'], required:[true , "Select please"]},
    Date:{ type:Date , required:[true ,"enter the date"] } 
});

const donation= mongoose.model("Donation",donateSchema);  //collection

app.get('/donationf',function(request,response)
{response.sendFile(__dirname + '/donationf.html');} );   //Get route

app.post('/donationf', function(request,response){
    const Uname= request.body.name;
    const Ucontact=request.body.contact;
    const Uemail=request.body.email;
    const Uaddress=request.body.address;
    const Udonate=request.body.list;
    const Udate=request.body.date;
  
    const UserData= new donation ({
        Name:Uname,
        Contact:Ucontact,
        Email:Uemail,
        Address:Uaddress,
        Donate:Udonate,
        Date:Udate
    })
    UserData.save();
    response.send("UserData saved Successfully...");
});

//Spritiual
const spiritSchema=new mongoose.Schema({
    Name:{type:String , required:[true , "enter your name"], minlength:3},

    Contact:{type:String , required:[true ,"enter your contact"] , 
       validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); },
        message: props => `${props.value} put contact as 202-301-1267`} },

    Email:{type:String , required:[true,"enter your email"] , 
    validate: { validator : function(email){ return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);},
    message: props => `${props.value} put valid email` } },

    Address:{type:String , required:[true ,"enter your address"]},
    Age:{type:Number , required:[true,"enter your age"]},
    Date:{ type:Date , required:[true ,"enter the date"] },
    Session:{ type:String , enum: ['Yoga', 'Meditation', 'Reiki'], required:[true , "Select please"]}, 
});

const spiritual= mongoose.model("SpiritualSession",spiritSchema);  //collection

app.get('/spiritual',function(request,response)
{response.sendFile(__dirname + '/spiritual.html');} );    //Get route

app.post('/spiritual', function(request,response){
    const Uname= request.body.name;
    const Ucontact=request.body.contact;
    const Uemail=request.body.email;
    const Uaddress=request.body.address;
    const Uage=request.body.age;
    const Udate=request.body.date;
    const Usession=request.body.list;

    const UserData= new spiritual ({
        Name:Uname,
        Contact:Ucontact,
        Email:Uemail,
        Address:Uaddress,
        Age:Uage,
        Date:Udate,
        Session:Usession
    })
    UserData.save();
    response.send("UserData saved Successfully...");

});

//signup
 const signupSchema = new mongoose.Schema({
    Name:{type:String , required:[true , "enter your name"] , minlength:3},
    Pass:{type:Number , required:[true , "please enter password"], minlength:8},

    Email:{type:String , required:[true,"enter your email"] , 
    validate: { validator : function(email){ return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);},
    message: props => `${props.value} put valid email` } },

    Contact:{type:String , required:[true ,"enter your contact"] , 
       validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); },
        message: props => `${props.value} put contact as 202-301-1267`} }
});

const signup= mongoose.model("SignUp",signupSchema);   //collection

app.get('/signup',function(request,response)
{response.sendFile(__dirname + '/sign-up.html');} );    //Get route

app.post('/signup', function(request,response){
    const Uname= request.body.name;
    const Upass= request.body.password;
    const Uemail=request.body.email;
    const Ucontact=request.body.contact;

  const UserData= new signup ({
    Name:Uname,
    Pass:Upass,
    Email:Uemail,
    Contact:Ucontact,
})
UserData.save();
response.send("UserData saved Successfully...");
});

//review
const reviewSchema= new mongoose.Schema({
    Name:{type:String , required:[true , "enter your name"] , minlength:3},

    Email:{type:String , required:[true,"enter your email"] , 
    validate: { validator : function(email){ return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);},
    message: props => `${props.value} put valid email` } },
    
    Review:{ type:String , required:[true , "enter your review"], minlenght:3 , maxlenght:60}
});

const review= mongoose.model("Review",reviewSchema);   //collection

app.get('/contact',function(request,response)
{response.sendFile(__dirname + '/contact.html');} );   //Get route

app.post('/contact', function(request,response){
    const Uname= request.body.name;
    const Uemail=request.body.email;
    const Umessage=request.body.message;

  const UserData= new review ({
    Name:Uname,
    Email:Uemail,
    Review:Umessage
})
UserData.save();
response.send("UserData saved Successfully...");
});

app.listen(3000,function() {  console.log('Server on port 3000 has started'); } );




    

