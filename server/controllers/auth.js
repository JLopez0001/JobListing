import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res) => {
    try {
        const {username, email, first_name, last_name, password, employed } = req.body   //Deconstruct User sent from FrontEnd

        //Check to see if there is an existing user with that username
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ error: "Username already exist" })
        }

        //Check to determin if password reaches minimal length requirments
        if(password.length < 6){
            return res.status(400).json({ error: "Password must be at least 6 characters long" })
        }

        //Hash password for security
        const password_digest = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))

        //Creates a new user
        const user = new User({
            username,
            email,
            password_digest,
            employed,
            first_name,
            last_name
        })
        await user.save()

        const payload = {
            id : user._id,
            username : user.username,
            email: user.email,
        }

        //Sign token 
        const token = jwt.sign(payload, process.env.TOKEN_KEY)
        res.status(201).json({ token });
    } catch (error) {
        console.error(error)
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}