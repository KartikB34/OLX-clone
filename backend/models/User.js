const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]          //Because initially object will be empty
    },
    avatar:{
        public_id: String,
        url:String,
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:[true,"email already exists"],                                    //Email shound be unique naa
    },
    password:{
        type:String,
        required:[true,"Please enter a Password"],
        minLength:[6,"Password must be atleast 6 characters"],
        select:false,                   //Whenever we excess a user's data password won't be shown
    },

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],

    purchaseRequest:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],

    purchased:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],

    //Newly added for resetting passwords through mail
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


//Before saving(for first time) or updating the schema run this function
userSchema.pre("save", async function (next) {

    //But this might hash the hased password when we'll update data other than password Thus adding if condition

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }

    next();  // move to next statement
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);        //Boolean function 
}

userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex")   //This token will be sent to mail (see post.js on controller => forget pass)
    // console.log(resetToken)

    //now hashing and saving this token on database
    //"sha256" is a hash algo/method
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10*60*1000         //reset password token will expire within 10min of generation

    return resetToken;
}

//Proving user._id and JWT_SECRET to generate token (encoded token)
userSchema.methods.generateToken = async function (){
    return await jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}

module.exports = mongoose.model("User",userSchema)