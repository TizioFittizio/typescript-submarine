/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserValues } from './../abstractions/User';
import { UserEntity, UserDAODocument } from '../../db/UserDAO';
import { User } from '../abstractions/User';

export class UserImp extends User {

    private dao: UserDAODocument | null;

    private constructor(values: UserValues, entity?: UserDAODocument){
        super(values);
        if (entity){
            this.dao = entity;
            this.values.id = entity.id;
        }
        else {
            this.dao = null;
        }
    }

    public static createFromValues(values: UserValues){
        return new UserImp(values);
    }

    public static createFromEntity(entity: UserDAODocument){
        return new UserImp(entity.toObject(), entity);
    }

    public async save(): Promise<void> {
        if (!this.dao) this.dao = new UserEntity(this.values);
        else {
            for (const key in this.values){
                if (key !== 'id') (this.dao as any)[key] = (this.values as any)[key];
            }
        }
        await this.dao.save();
        this.values.id = this.dao.id;
    }

}