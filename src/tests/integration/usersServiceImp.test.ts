/* eslint-disable @typescript-eslint/no-magic-numbers */
import { UserDAO, UserDAODocument } from '../../db/UserDAO';
import { UserValues } from '../../models/User';
import { IOC } from '../../services/implementations/IOC';
import { UsersServiceImp } from '../../services/implementations/UsersServiceImp';

const { configService, dbService } = IOC.instance;

const service = new UsersServiceImp();
let userDAO: UserDAODocument;

const dummyValues: UserValues = {
    name: 'AAA',
    surname: 'BBB',
    gender: 'male'
};

beforeAll(async() => {
    configService.loadConfiguration();
    await dbService.connect();
});

afterAll(async() => {
    await dbService.disconnect();
});

beforeEach(async() => {
    await UserDAO.deleteMany({ });
    userDAO = await UserDAO.create(dummyValues);
});

afterEach(async() => {
    await UserDAO.deleteMany({ });
});

it('should be created correctly', () => {
    const user = service.create(dummyValues);
    expect(user.name).toBe(dummyValues.name);
    expect(user.id).toBeUndefined();
});

describe('When finding by id', () => {
    it('should be found with id correctly', async() => {
        const user = await service.findByIDOrThrow(userDAO.id);
        expect(user.id).toBe(userDAO.id);
        expect(user.score).toBe(0);
    });

    it('should throw with id not found', async() => {
        await expect(service.findByIDOrThrow(new UserDAO().id)).rejects.toThrow();
    });
});

describe('When saving', () => {
    it('should be saved new correctly', async() => {
        const user = service.create({ ...dummyValues, name: 'B' });
        const userSaved = await service.save(user);
        expect(userSaved.name).toBe('B');
        const userInDB = await UserDAO.findOne({ name: 'B' }).exec();
        expect(userInDB).toBeTruthy();
    });

    it('should be saved already existing correctly', async() => {
        const user = await service.findByIDOrThrow(userDAO.id);
        user.incrementScore();
        const userSaved = await service.save(user);
        expect(userSaved.score).toBe(1);
        const userInDB = await UserDAO.findById(userDAO.id);
        expect(userInDB?.score).toBe(1);
    });
});

describe('When deleting', () => {
    it('should throw new deleting new', async() => {
        const user = service.create({ ...dummyValues });
        await expect(service.deleteOrThrow(user)).rejects.toThrow();
    });

    it('should be deleted already existing correctly', async() => {
        const user = await service.findByIDOrThrow(userDAO.id);
        await service.deleteOrThrow(user);
        const userInDB = await UserDAO.findById(userDAO.id);
        expect(userInDB).toBeNull();
    });
});