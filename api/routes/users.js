const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const user = require("../models/user");

//UPDATE USER
router.put("/:id", async (req, res)=>{
    // if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSaltSync(10);
                req.body.password = await bcrypt.hashSync(req.body.password, salt); 
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body      
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error);
        }
    
    // else{
    //     return res.status(403).json("You can update only your account");
    // }
});
//DELETE USER
router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else{
        return res.status(403).json("You can delete only your account");
    }
});
//GET A USER
router.get("/", async (req, res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ?  await User.findById(userId)
        : await User.findOne({username : username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);    
    } catch (error) {
            res.status(500).json(error);
    }
});
//FOLLOW USER
router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push : {followers : req.body.userId}});
                await currentUser.updateOne({$push : {following : req.params.id}});
                res.status(200).json("user has been followed");
            }
            else{
                res.status(403).json("you already follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
            res.status(403).json("you can't follow yourself");
    }
});
//UNFOLLOW USER
router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : {followers : req.body.userId}});
                await currentUser.updateOne({$pull : {following : req.params.id}});
                res.status(200).json("user has been unfollowed");
            }
            else{
                res.status(403).json("you don't follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
            res.status(403).json("you can't unfollow yourself");
    }
});
//GET FRIENDS
router.get("/friends/:userId", async (req, res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
});

//ADD OR UPDATE PROFILE PICTURE
router.put("/profilepic/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        await user.updateOne( 
        {
            $set: {
                profilePicture : req.body.picture
            }
        });
        res.status(200).json("Profile picture has been updated.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//ADD OR UPDATE COVER PICTURE
router.put("/coverpic/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        await user.updateOne( 
        {
            $set: {
                coverPicture : req.body.picture
            }
        });
        res.status(200).json("Cover picture has been updated.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;