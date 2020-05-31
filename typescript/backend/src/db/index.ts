import mongoose from "mongoose";
import UserSchema from "../model/user";

export const connectUrl = 'mongodb://localhost/react_image';
export const userDb = mongoose.model('image', UserSchema);