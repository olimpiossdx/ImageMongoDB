import { IUser } from "../model/user";
import { userDb } from "../db";

export const postUpload = async (user: IUser) => {
    return await userDb.create(user).then(_result => {
        return true;
    }).catch(error => {
        console.log("error ", error);
        return false
    });
};

export const getUser = async () => {
    return await userDb.findOne().sort({ _id: -1 });
};



