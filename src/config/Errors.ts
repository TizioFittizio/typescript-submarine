// tslint:disable:max-classes-per-file

export class NotInitializedError extends Error {
    public readonly status = 500;
    constructor(message: string){
        super(message);
    }
}

export class MissingValueError extends Error {
    public readonly status = 400;
    constructor(message: string){
        super(message);
    }
}

export class WrongCredentialsError extends Error {
    public readonly status = 401;
    constructor(message: string){
        super(message);
    }
}

export class NotFoundError extends Error {
    public readonly status = 404;
    constructor(message: string){
        super(message);
    }
}