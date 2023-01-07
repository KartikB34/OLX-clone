const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

exports.createPost = async (req,res) => {

    try{

        const mycloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder:"olxposts"
        })     //Uploading image to cloudinary in folder named "posts"

        const newPostData = {
            title: req.body.title,
            image:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            },
            owner:req.user._id,
            description: req.body.description,
            category: req.body.category,
            condition: req.body.condition,
            brand: req.body.brand,
            price: req.body.price,
        }


        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id)

        user.posts.unshift(post._id)              //unshift me starting me add hoga
        await user.save();                      //Save bhi krna pdta hai

        res.status(201).json({
            success:true,
            post,
            message:"Post Created"
        });

    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


//Delete Post Using same for OLX
exports.deletePost = async (req,res) => {

    try {

        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }

        //Only the owner of post can delete the post
        if(post.owner.toString() !== req.user._id.toString()){
            
            return res.status(401).json({
                success:false,
                message:"Unautharised user"
            })
        }

        //if the user is the owner
        await post.remove()

        //Removing the image from cloudinary
        await cloudinary.v2.uploader.destroy(post.image.public_id)

        
        //Removing post._id from User.posts
        const user = await User.findById(req.user._id)
        const index = user.posts.indexOf(req.params.id)

        user.posts.splice(index,1)
        await user.save()                  //we'll save the user not user.posts


        res.status(200).json({
            success:true,
            message:"Post deleted"
        })

        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//Get all unsold products
exports.getAllPosts = async (req,res) => {

    try {

        const posts = await Post.find({sold:false}).populate("owner")
        // Show all posts other than posted by user

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