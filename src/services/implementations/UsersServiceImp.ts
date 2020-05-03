import { NotFoundError } from './../../config/Errors';
import { UserDAODocument, UserDAO } from './../../db/UserDAO';
import { UsersService } from '../interfaces';
import { UserValues, User } from '../../models';

export class UsersServiceImp implements UsersService {

    public create(values: UserValues): User {
        return new User(values);
    }

    public async save(user: User): Promise<User> {
        const dao = this.fromModelToMongooseDocument(user);
        if (user.id){
            await UserDAO.replaceOne({ _id: user.id }, dao).exec();
        }
        else {
            await dao.save();
        }
        const newUser = this.fromMongooseDocumentToModel(dao);
        return newUser;
    }

    public async deleteOrThrow(user: User): Promise<User> {
        const { deletedCount } = await UserDAO.deleteOne({ _id: user.id });
        if (!deletedCount) throw new NotFoundError(`Attempting to delete document not found, id: ${user.id}`);
        return user;
    }

    public async findByIDOrThrow(id: string): Promise<User> {
        const userDAO = await UserDAO.findById(id);
        if (!userDAO) throw new NotFoundError('No user found');
        return this.fromMongooseDocumentToModel(userDAO);
    }

    private fromModelToMongooseDocument(user: User): UserDAODocument {
        return new UserDAO({ ...user.getValuesToPersist(), _id: user.id });
    }

    private fromMongooseDocumentToModel(mongooseDocument: UserDAODocument): User {
        return new User({ ...mongooseDocument.toObject(), id: mongooseDocument.id });
    }

}