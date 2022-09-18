const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const path=require('path');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')))

//const alert=require("alert");
mongoose.connect("mongodb+srv://new-user:user123@cluster0.j6w2pyy.mongodb.net/userDB",{useNewUrlParser:true});
const userSchema=new mongoose.Schema({
    emp:String,
    userName:String,
    password:String,
    confirmPassword:String,
    img:{
        data:Buffer,
        type:String
    }

});
let userDetails;

const Item=new mongoose.model("Item",userSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("sarath");
});
    // app.get("/main",(req,res)=>{
    //      res.sendFile(__dirname+"/sarath_main.html");
    //  });
  
 







app.post("/",(req,res)=>{
    userDetails={
        emp:req.body.email,
        userName:req.body.username,
        password:req.body.password,
        confirmPassword:req.body.confrm,
        img:req.body.photo
    
    }

     if(verifiedOrNot(userDetails.password,userDetails.confirmPassword)){
      
        const user=new Item(userDetails);
        user.save();
        res.redirect("/");
     }
   
});
app.post("/main",(req,res)=>{
        const uName=req.body.lomail;
        const password=req.body.lopassword;
        //console.log(password);
       // const loginDetails=Item.findOne({userName:uName});
      // Item.find((err,items)=)
        Item.findOne({userName:uName},function(err,loginDetails){
            console.log(loginDetails);
            if(loginDetails.password===password){
                //console.log(loginDetails.userName);
                Item.find({userName:{$ne:null}}, function(err, foundlist){
                    //console.log(foundlist);
                    res.render("sarath_main",{
                        totalmembers:foundlist
                    });
                })
                
            }
            else {
                //alert("wrong details");
                res.render("error");
            }
        });
         
        
});




function verifiedOrNot(password,confirmPassword){
    if(password===confirmPassword){
        return true;
    }
    else{
        return false;
    }
}




app.listen(5000);
