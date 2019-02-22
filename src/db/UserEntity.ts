import { Constants } from './../config/Constants';
import { UserValues } from './../models/abstractions/User';
import { Schema, Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';

export interface UserEntityDocument extends Document, UserValues {

}

export interface UserEntityModel extends Model<UserEntityDocument> {

}

const schema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'fermale']
    }
});

export const UserEntity: UserEntityModel =
mongoose.model<UserEntityDocument, UserEntityModel>(Constants.MONGO_MODEL_NAME_USER, schema);