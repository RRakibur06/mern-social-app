const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register",async (req,res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

        //create new user
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
            description : req.body.description,
            city : req.body.city,
            from : req.body.from,
            relationship : req.body.relationship
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})
//LOGIN
router.post("/login",async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).send("wrong password");

        res.status(200).send(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;