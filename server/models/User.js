import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        username: {type: String, required: true, unique:true},
        first_name: {type: String, required:true},
        last_name: {type: String, required:true},
        email: {type: String, required: true},
        password_digest: {type: String, required: true, select: false},
        employed: Boolean
    },
    { timestamps: true }
);

export default  mongoose.model('users', UserSchema);
