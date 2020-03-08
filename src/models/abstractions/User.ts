export interface UserValues {
    id?: string;
    name: string;
    surname: string;
    gender: 'male' | 'female';
    score?: number;
}

export abstract class User {

    private static readonly DEFAULT_SCORE = 0;

    protected values: UserValues;

    protected constructor(values: UserValues) {
        this.values = {
            ...values,
            score: values.score ?? User.DEFAULT_SCORE
        };
    }

    public incrementScore(){
        this.values.score! ++;
    }

    public abstract save(): Promise<void>;

    public get id(){
        return this.values.id;
    }

    public get name(){
        return this.values.name;
    }

    public get surname(){
        return this.values.surname;
    }

    public get gender(){
        return this.values.gender;
    }

    public get score(){
        return this.values.score!;
    }

}