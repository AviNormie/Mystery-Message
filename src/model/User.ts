import mongoose , {Schema , Document } from 'mongoose';

export interface Message extends Document {
            content: string;
            createdAt: Date;
}

const MessageSchema:Schema<Message> = new Schema({
    content:{type: String, required: true},
    createdAt:{type: Date,required: true, default: Date.now}

});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiry:Date
    isAcceptingMessage:boolean;
    messages: Message[];
}

const UserSchema:Schema<User> = new Schema({
    username:{type: String, required:[ true,'Username is required'], unique: true , },
    email:{type: String, required: true, unique: true, match: [/.+\@.+\..+/,'please enter a valid email']},
    password:{type: String, required: true},
    isVerified:{type: Boolean, default: false},  // this field will be used for sending verification email
    verifyCode:{type: String},
    verifyCodeExpiry:{type: Date},          
    isAcceptingMessage:{type: Boolean, default: true},
    messages:[MessageSchema]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel;












