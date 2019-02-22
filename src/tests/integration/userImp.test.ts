import { UserEntity, UserEntityDocument } from './../../db/UserEntity';
import { UserCreator } from './../../models/implementations/UserCreator';
import { UserValues } from './../../models/abstractions/User';
import { IOC } from '../../services';

const { dbService } = IOC.instance;

const dummyValues: UserValues = {
    name: 'AAA',
    surname: 'BBB',
    gender: 'male'
};

beforeAll(async () => {
    await dbService.connect();
});

afterAll(async () => {
    await dbService.disconnect();
});

describe('When creating user from values', () => {

    beforeEach(async () => {
        await UserEntity.deleteMany({ });
    });

    afterEach(async () => {
        await UserEntity.deleteMany({ });
    });

    it('should be created correctly', () => {
        const user = UserCreator.create(dummyValues);
        expect(user.name).toBe(dummyValues.name);
        expect(user.surname).toBe(dummyValues.surname);
        expect(user.gender).toBe(dummyValues.gender);
        expect(user.score).toBe(0);
        expect(user.id).toBeUndefined();
        user.incrementScore();
        expect(user.score).toBe(1);
    });

    it('should be saved correctly', async () => {
        const user = UserCreator.create(dummyValues);
        await user.save();
        expect(user.id).toBeTruthy();
        const userInDb = await UserEntity.findById(user.id);
        expect(userInDb).toBeTruthy();
        expect(userInDb!.name).toBe(dummyValues.name);
        expect(userInDb!.score).toBe(0);
        user.incrementScore();
        await user.save();
        const userInDb2 = await UserEntity.findById(user.id);
        expect(userInDb2!.score).toBe(1);
        const usersInDb = await UserEntity.find({ });
        expect(usersInDb.length).toBe(1);
    });

});

describe('When creating user from entity id', () => {

    let userEntity: UserEntityDocument;

    beforeEach(async () => {
        await UserEntity.deleteMany({ });
        userEntity = new UserEntity(dummyValues);
        await userEntity.save();
    });

    afterEach(async () => {
        await UserEntity.deleteMany({ });
    });

    it('should be created correctly', async () => {
        const user = await UserCreator.findById(userEntity.id);
        expect(user).toBeTruthy();
        expect(user!.id).toBe(userEntity.id);
        expect(user!.name).toBe(dummyValues.name);
        expect(user!.surname).toBe(dummyValues.surname);
        expect(user!.gender).toBe(dummyValues.gender);
        expect(user!.score).toBe(0);
    });

    it('should be saved correctly', async () => {
        const user = await UserCreator.findById(userEntity.id);
        expect(user!.score).toBe(0);
        user!.incrementScore();
        expect(user!.score).toBe(1);
        await user!.save();
        const userInDb = await UserEntity.findById(user!.id);
        expect(userInDb!.score).toBe(1);
        const usersInDb = await UserEntity.find({ });
        expect(usersInDb.length).toBe(1);
    });

    it('should return null for a not existing id', async () => {
        const user = await UserCreator.findById(new UserEntity().id);
        expect(user).toBeNull();
    });

});