const express=require("express")
const mongoose=require("mongoose")
mongoose.connect('mongodb://localhost/assignment');
const User=require("./model/user")
var jwt = require('jsonwebtoken');
const loginRouter=require("./routes/login");
const postRouter=require("./routes/posts");
const userRouter=require("./routes/users");
const secret="RESTAPI"


const app=express();
const port =3000;

app.use(express.urlencoded());
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("ok")
// })
app.use("/posts",async(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split("test ")[1];
        
    
    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
          
            res.status(500).json ({
              status:"failed",
              message:"Not Authenticated"
            })
        }
        const user=await User.findOne({_id:decoded.data});
        req.user=user._id;
        next();
      });
    } else{
        return res.status(500).json({
            status:"failed",
            message:"Invalid token"
        })
    }
});

app.use("/",loginRouter);
app.use("/posts",postRouter);
app.use("/",userRouter);

app.listen(port,()=>{
console.log("server is running....")
})
