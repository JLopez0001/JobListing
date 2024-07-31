import User from '../models/User.js';
import Jobs from '../models/Jobs.js';
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

// Function to add a job into the User jobs applied seciont
export const applyForJob = async (req, res) => {
    try {
        // Extract user._id from token 
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = payload.id;

        console.log("this is userID", userId)

        // Find user and job
        const { jobId } = req.params;

        console.log('this is jobID', jobId)

        const user = await User.findById(userId);
        const job =  await Jobs.findById(jobId);

        console.log('This is user', user)
        console.log('This is job', job)

        if (!user || !job) {
            return res.status(404).json({ status: 'fail', message: 'User or Job not found' });
        }

        // Check if the user has already applied
        if (user.jobsApplied.includes(jobId)) {
            return res.status(400).json({ status: 'fail', message: 'You have already applied for this job' });
        }

        // Add job to applied list in User model
        user.jobsApplied.push(jobId);
        await user.save();

        res.status(200).json({ status: 'success', message:'Applied to job successfull and saved', data: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', message: 'An error occurred while applying for this job. Please make sure you are logged in and try again.' });
    }
};

// Get jobs user applied too
export const getAppliedJobs = async (req, res) => {
    try {
        // Extract user._id from token 
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = payload.id;

        // Find user and populate the field
        const user = await User.findById(userId).populate('jobsApplied');

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        res.status(200).json({ status: 'success', data: user.jobsApplied });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching applied jobs. Please try again later.' });
    }    
};