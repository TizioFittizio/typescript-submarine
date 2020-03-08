/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
    NotInitializedError,
    MissingValueError,
    InvalidValueError,
    WrongCredentialsError,
    NotFoundError,
    InvalidOperationError,
    ForbiddenOperationError,
    RemoteOperationError
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

it('should use invalid operation error correctly', () => {
    const error = new InvalidOperationError();
    expect(error.status).toBe(400);
});

it('should use forbidden operation error correctly', () => {
    const error = new ForbiddenOperationError();
    expect(error.status).toBe(403);
});

it('should use not remote operation error correctly', () => {
    const error = new RemoteOperationError();
    expect(error.status).toBe(500);
});