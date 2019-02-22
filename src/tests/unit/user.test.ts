import { UserValues } from './../../models/abstractions/User';
import { User } from '../../models/abstractions/User';

class TestUser extends User {

    public static create(values: UserValues){
        return new TestUser(values);
    }

    public async save(): Promise<void> {
        return void 0;
    }

}

const createTestUser = () => TestUser.create({
    name: 'Luca',
    surname: 'MacKenzie',
    gender: 'male',
    id: 5
});

describe('When created', () => {

    let user: User;

    beforeAll(() => {
        user = createTestUser();
    });

    it('should have correct values', () => {
        expect(user.name).toBe('Luca');
        expect(user.surname).toBe('MacKenzie');
        expect(user.gender).toBe('male');
        expect(user.id).toBe(5);
    });

    it('should have an initial score of 0', () => {
        expect(user.score).toBe(0);
    });

});

it('should increment score correctly', () => {
    const user = createTestUser();
    const previousScore = user.score;
    user.incrementScore();
    expect(user.score).toBe(previousScore + 1);
});