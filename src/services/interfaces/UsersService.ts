import { UserValues, User } from '../../models';

export interface UsersService {
    create(values: UserValues): User;
}