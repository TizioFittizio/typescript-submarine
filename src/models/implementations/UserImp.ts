import { UserValues } from './../abstractions/User';
import { UserEntity, UserEntityDocument } from './../../db/UserEntity';
import { User } from '../abstractions/User';

export class UserImp extends User {

    public static createFromValues(values: UserValues){
        return new UserImp(values);
    }

    public static createFromEntity(entity: UserEntityDocument){
        return new UserImp(entity.toObject(), entity);
    }

    private entity: UserEntityDocument | null;

    private constructor(values: UserValues, entity?: UserEntityDocument){
        super(values);
        this.entity = entity || null;
    }

    public async save(): Promise<void> {
        if (!this.entity){
            this.entity = new UserEntity(this._values);
        }
        await this.entity.save();
        this._values.id = this.entity.id;
    }

}