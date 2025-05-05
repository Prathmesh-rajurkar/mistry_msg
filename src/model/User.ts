import mongoose, { Schema, Document } from "mongoose";



export interface Message extends Document{
    content: string,
    createdAt: Date,
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode:string,
    verifyCodeExpire: Date,
    isVerified: boolean,
    isAcceptingMessages: boolean,
    message: Message[],
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ,'please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match:[ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}])[A-Za-z\d@$!%*?&#^()[\]{}]{8,}$/
        ,'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpire: {
        type: Date,
        required: [true, "Verify Code Expire is required"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAcceptingMessages:{
        type: Boolean,
        default: true,
    },
    message: [MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
export default UserModel;
