import {
    NotInitializedError,
    MissingValueError,
    InvalidValueError,
    WrongCredentialsError,
    NotFoundError
} from './../../config/Errors';

it('should use not initialized error correctly', () => {
    const error = new NotInitializedError();
    expect(error.status).toBe(500);
});

it('should use missing value error correctly', () => {
    const error = new MissingValueError();
    expect(error.status).toBe(400);
});

it('should use invalid value error correctly', () => {
    const error = new InvalidValueError();
    expect(error.status).toBe(400);
});

it('should use wrong credentials error correctly', () => {
    const error = new WrongCredentialsError();
    expect(error.status).toBe(401);
});

it('should use not found error correctly', () => {
    const error = new NotFoundError();
    expect(error.status).toBe(404);
});