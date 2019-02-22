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
        if (entity){
            this.entity = entity;
            this._values.id = entity.id;
        }
        else {
            this.entity = null;
        }
    }

    public async save(): Promise<void> {
        if (!this.entity) this.entity = new UserEntity(this._values);
        else {
            for (const key in this._values){
                if (key !== 'id') (this.entity as any)[key] = (this._values as any)[key];
            }
        }
        await this.entity.save();
        this._values.id = this.entity.id;
    }

}