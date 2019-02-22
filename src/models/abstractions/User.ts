export interface UserValues {
    id?: any;
    name: string;
    surname: string;
    gender: 'male' | 'female';
    score?: number;
}

export abstract class User {

    protected _values: UserValues;

    protected constructor(values: UserValues) {
        this._values = values;
        this._values.score = 0;
    }

    public incrementScore(){
        this._values.score! ++;
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
        return this._values.score!;
    }

}
