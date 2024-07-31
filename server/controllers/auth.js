import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res) => {
    try {
        const {username, email, first_name, last_name, password, employed } = req.body;   //Deconstruct User sent from FrontEnd

        //Check to see if there is an existing user with that username
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ error: "Username already exist" });
        };

        //Check to determin if password reaches minimal length requirments
        if(password.length < 6){
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        };

        //Hash password for security
        const password_digest = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        //Creates a new user
        const user = new User({
            username,
            email,
            password_digest,
            employed,
            first_name,
            last_name,
            employed
        });
        await user.save();

        const payload = {
            id : user._id,
            username : user.username,
            email: user.email,
        };

        //Sign token 
        const token = jwt.sign(payload, process.env.TOKEN_KEY);
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req,res) => {
    try {
        const {username, password} = req.body;

        //Check to see if there is a user with that email and password
        const user = await User.findOne({ username }).select(
            "username email password_digest"
        );

        console.log(user)

        if(!user){
            return res.status(401).json({ message: "Invalid username or password" });
        };

        if(!user || !password){
            return res.status(400).json({ message : "Please fill out all fields" });
        };

        //Compare passwords and send token through payload if match
        if(await bcrypt.compare(password, user.password_digest)) {
            const payload = {
                id: user._id,
                username: user.username,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.TOKEN_KEY);
            res.status(201).json({ token });
        } else {
            res.status(401).send("Invalid Credentials");
        };
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    };
};

export const verifyUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.TOKEN_KEY);

        if(payload){
            res.json(payload);
        };
    } catch (error) {
        console.log(error.message);
        res.status(401).send("Not Authorized");
    };
};