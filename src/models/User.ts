export interface UserValues {
    name: string;
    surname: string;
    gender: 'male' | 'fermale';
    score: number;
}

export abstract class User {

    protected _values: UserValues;

    constructor(values: UserValues) {
        this._values = values;
    }

    public incrementScore(){
        this._values.score ++;
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
        return this._values.score;
    }

}
