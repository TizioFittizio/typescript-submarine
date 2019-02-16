export interface UserValues {
    name: string;
    surname: string;
    gender: 'male' | 'female';
}

export abstract class User {

    protected _values: UserValues;

    private _score: number;

    constructor(values: UserValues) {
        this._values = values;
        this._score = 0;
    }

    public incrementScore(){
        this._score ++;
    }

    public abstract save(): Promise<void>;

    public get name(){
        return this._values.name;
    }

    public get surname(){
        return this._values.surname;
    }

    public get gender(){
        return this._values.gender;
    }

    public get score(){
        return this._score;
    }

}
