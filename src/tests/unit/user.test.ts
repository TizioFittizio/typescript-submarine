import { User } from '../../models/User';

class TestUser extends User {

    public async save(): Promise<void> {
        return void 0;
    }

}

const createTestUser = () => new TestUser({
    name: 'Luca',
    surname: 'MacKanzie',
    gender: 'male'
});

describe('When created', () => {

    let user: User;

    beforeAll(() => {
        user = createTestUser();
    });

    it('should have correct values', () => {
        expect(user.name).toBe('Luca');
        expect(user.surname).toBe('MacKanzie');
        expect(user.gender).toBe('male');
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