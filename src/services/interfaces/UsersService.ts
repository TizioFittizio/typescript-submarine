import { UserValues, User } from '../../models';

export interface UsersService {
    create(values: UserValues): User;
    save(user: User): Promise<User>;
    deleteOrThrow(user: User): Promise<User>;
    findByIDOrThrow(id: string): Promise<User>;
}