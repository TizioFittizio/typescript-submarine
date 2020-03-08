import { Constants } from './../config/Constants';
import { Schema, Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserValues } from '../models';

export interface UserEntityDocument extends Document, Omit<UserValues, 'id'> {

}

export type UserEntityModel = Model<UserEntityDocument>

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
    },
    score: {
        type: Number
    }
});

export const UserEntity: UserEntityModel =
mongoose.model<UserEntityDocument, UserEntityModel>(Constants.MONGO_MODEL_NAME_USER, schema);