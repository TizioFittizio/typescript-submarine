import { UserValues } from './../abstractions/User';
import { User } from '../abstractions/User';
import { UserEntity } from '../../db/UserEntity';
import { UserImp } from './UserImp';

export class UserCreator {

    public static create(values: UserValues): User {
        return UserImp.createFromValues(values);
    }

    public static async findById(id: string): Promise<User | null> {
        const userEntity = await UserEntity.findById(id);
        return userEntity ? UserImp.createFromEntity(userEntity) : null;
    }

}