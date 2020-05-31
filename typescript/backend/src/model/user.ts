import mongoose from 'mongoose';

export interface IUser {
    name: String,
    extensao: String,
    imgUrl1: String,
    imgUrl2: String,
    imgUrl3: String
};

const UserSchema = new mongoose.Schema({
    name: String,
    extensao: String,
    imgUrl1: String,
    imgUrl2: String,
    imgUrl3: String
});

export default UserSchema;