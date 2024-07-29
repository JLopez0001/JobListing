import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document{
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password_digest: string;
    employed: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
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

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
