const mongoose=require("mongoose");
const Schema=mongoose.Schema



const postSchema=new Schema({
    tittle:{type:String,required:true},
    body:{type:String,required:true},
    image:String,
    user:{type:Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

const Post=mongoose.model("Post",postSchema);

module.exports=Post;