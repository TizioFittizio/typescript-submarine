import { User } from '../abstractions/User';
import { UserEntity } from '../../db/UserEntity';
import { UserImp } from './UserImp';

export class UserCreator {

    public static async findById(id: string): Promise<User | null> {
        const userEntity = await UserEntity.findById(id);
        return userEntity ? new UserImp(userEntity.toObject(), userEntity) : null;
    }

}