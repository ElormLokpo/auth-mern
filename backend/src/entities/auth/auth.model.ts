import { model, Schema } from "mongoose";
import { GenderEnum } from "./auth.types";
import { v4 } from "uuid";



export const AuthSchema = new Schema({
    _id: {
        type: String
    },

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    othernames: String,
    email: {
        type: String,
        required: true
    },
    email_verified:Boolean,
    mobile: String,
    password: {
        type: String,
        required: true,
        select:false
    },
    gender: {
        type: String,
        enum: Object.values(GenderEnum)
    },
    country: String,
    profile_picture: String,
    location:String, 
    zip_code: Number

})

AuthSchema.pre("save", async function () {
    this._id = v4();
})


export const AuthModel = model("AuthModel", AuthSchema)