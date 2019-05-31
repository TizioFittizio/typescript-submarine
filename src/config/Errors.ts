// tslint:disable:max-classes-per-file

export class NotInitializedError extends Error {
    public readonly status = 500;
}

export class MissingValueError extends Error {
    public readonly status = 400;
}

export class InvalidValueError extends Error {
    public readonly status = 400;
}

export class WrongCredentialsError extends Error {
    public readonly status = 401;
}

export class NotFoundError extends Error {
    public readonly status = 404;
}