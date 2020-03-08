import { UsersService } from '../interfaces';
import { UserValues, User, UserImp } from '../../models';

export class UsersServiceMongo implements UsersService {

    public create(values: UserValues): User {
        return UserImp.createFromValues(values);
    }

}