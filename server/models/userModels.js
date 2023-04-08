const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 username:{
    type:String,
    require: true,
    min:3,
    max:12,
    unique:true
 },
 email:{
    type:String,
    require: true,
    max:20,
    unique:true
 },
 password:{
    type:String,
    require: true,
    min:8
 },
 isAvatarImageSet:{
    type:Boolean,
    default: false
 },
 avatarImage:{
    type: String,
    default:"",
 },
 myProfile:{
   type:Boolean,
   default: false
},

})
module.exports = mongoose.model("users",userSchema)