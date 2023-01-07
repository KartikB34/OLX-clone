const Post = require("../models/Post");
const User = require("../models/User")
const {sendEmail} = require("../middleware/sentEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.register = async (req,res) => {

    try {

        const {name, email, password, avatar} = req.body;

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                success:false,
                message:"User with same email already exists"
            })
        }

        const mycloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:"olxavatars"
        })

        user = await User.create({
            name,
            email, 
            password,
            avatar:{
                public_id: mycloud.public_id,
                url:mycloud.secure_url
            }
        })

        //Logging in user As soon as registered
        const token = await user.generateToken();               // YOU FORGET TO ADD AWAIT
        const options = {                                       // Creating cookie named "token" whose value is token
            expires: new Date(Date.now() + 90*24*60*60*1000),              //Expired the cookie after 9 days  
            httpOnly: true
        }

        res.status(201)                                //201 => created
            .cookie("token", token, options)           //Option contains token expiry details
            .json({
            success:true,
            user,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//User login
exports.login = async (req,res) => {

    try {

        const {email, password} = req.body;

        let user = await User.findOne({email}).select("+password").populate("posts");    //to match the password.. select should be true for password

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exists",
            })
        }

        const isMatch = await user.matchPassword(password);         //function is defined below User schema
        // console.log(isMatch)

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        const token = await user.generateToken();               // YOU FORGET TO ADD AWAIT
        const options = {                                       // Creating cookie named "token" whose value is token
            expires: new Date(Date.now() + 90*24*60*60*1000),              //Expired the cookie after 9 days  
            httpOnly: true
        }

        res.status(200)
            .cookie("token", token, options)
            .json({
            success:true,
            user,                                                //from here we are fetching user._id
            token
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//user Logout
exports.logout = async (req,res) => {

    try {

        res.status(200)
            .cookie("token",null, {expires: new Date(Date.now()), httpOnly:true})
            .json({
                success:true,
                message:"Logged out"
            })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Send purchase request to a post
exports.purchaseRequest = async(req,res) => {

    try {

        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success: true,
                message:"Post not found"
            })
        }

        if(post.owner.toString() == req.user._id.toString()){
            return res.status(200).json({
                success: true,
                message: "Cannot purchase own product"
            })
        }

        if(post.purchaseRequest.includes(req.user._id)){
            return res.status(200).json({
                success: true,
                message: "Already requested"
            })
        }

        const owner = await User.findById(post.owner)

        if(!owner){
            return res.status(404).json({
                success: true,
                message:"Owner not found"
            })
        }

        const user = await User.findById(req.user._id)
        

        if(!user){
            return res.status(404).json({
                success: true,
                message:"Loggedin user not found"
            })
        }

        post.purchaseRequest.push(req.user._id)
        user.purchaseRequest.push(post._id)

        await post.save()
        await user.save()

        res.status(200).json({
            success: true,
            message: "Purchase request sent"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Accept purchase request to a post
exports.acceptPurchaseRequest = async(req,res) => {

    try {

        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success: false,
                message:"Post not found"
            })
        }

        if(post.sold){
            return res.status(200).json({
                success: false,
                message:"Product already sold!"
            })
        }

        const buyer = await User.findById(req.body.buyer)

        if(!buyer){
            return res.status(404).json({
                success: true,
                message:"Person (buyer) not found"
            })
        }

        post.sold = true
        post.buyer = buyer._id

        const indexOfRequestFromPost = post.purchaseRequest.indexOf(buyer._id)
        const indexOfRequestFromBuyer = buyer.purchaseRequest.indexOf(post._id)

        post.purchaseRequest.splice(indexOfRequestFromPost,1)
        buyer.purchaseRequest.splice(indexOfRequestFromBuyer,1)
        buyer.purchased.push(post._id)

        await post.save()
        await buyer.save()

        res.status(200).json({
            success: true,
            message: `Purchase request accepted from ${buyer.name}`
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Decline purchase request to a post
exports.declinePurchaseRequest = async(req,res) => {

    try {

        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success: true,
                message:"Post not found"
            })
        }

        const buyer = await User.findById(req.body.buyer)

        if(!buyer){
            return res.status(404).json({
                success: true,
                message:"Person (buyer) not found"
            })
        }

        const indexOfRequestFromPost = post.purchaseRequest.indexOf(buyer._id)
        const indexOfRequestFromBuyer = buyer.purchaseRequest.indexOf(post._id)

        post.purchaseRequest.splice(indexOfRequestFromPost,1)
        buyer.purchaseRequest.splice(indexOfRequestFromBuyer,1)

        await post.save()
        await buyer.save()

        res.status(200).json({
            success: true,
            message: "Purchase request rejected"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//My profile data
exports.myProfile = async (req,res) => {

    try {

        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user,            
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get user profile
exports.getUserProfile = async (req,res) => {

    try {

        const user = await User.findById(req.params.id).populate("posts")      //post with details to be shown

        if(!user){
            return res.status(404).json({
                success:true,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user,
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get all users
exports.getAllUsers = async (req,res) => {

    try {

        const users = await User.find({
            name:{$regex: req.query.name, $options:"i"}
        })

        res.status(200).json({
            success:true,
            users,
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//Get user products OLX
exports.getAllMyPosts = async (req,res) => {

    try {

        const posts = await Post.find({owner:req.user._id}).populate("owner buyer purchaseRequest")

        res.status(200).json({
            success:true,
            posts,             //Latest post should be displayed first
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//Get all my Purchases OLX
exports.getAllMyPurchases = async (req,res) => {

    try {

        const posts = await Post.find({buyer: req.user._id}).populate("owner")

        res.status(200).json({
            success:true,
            posts,             //Latest post should be displayed first
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}