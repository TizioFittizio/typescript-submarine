/* eslint-disable @typescript-eslint/no-magic-numbers */
import { UserValues } from '../../models/User';
import { User } from '../../models/User';

const createTestUser = (options?: { score?: number }) => {
    const values: UserValues = {
        name: 'Luca',
        surname: 'MacKenzie',
        gender: 'male',
        id: '5'
    };
    if (options && options.score) values.score = options.score;
    return new User(values);
};

describe('When created', () => {
    it('should be created correctly', () => {
        const user = createTestUser();
        expect(user.name).toBe('Luca');
        expect(user.surname).toBe('MacKenzie');
        expect(user.gender).toBe('male');
        expect(user.id).toBe('5');
        expect(user.score).toBe(0);
    });

    it('should be created with different score when specified', () => {
        const user = createTestUser({ score: 1337 });
        expect(user.score).toBe(1337);
    });
});

it('should increment score correctly', () => {
    const user = createTestUser();
    const previousScore = user.score;
    user.incrementScore();
    expect(user.score).toBe(previousScore + 1);
});