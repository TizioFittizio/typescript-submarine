export interface UserValues {
    id?: any;
    name: string;
    surname: string;
    gender: 'male' | 'female';
    score?: number;
}

export abstract class User {

    protected values: UserValues;

    protected constructor(values: UserValues) {
        this.values = {
            ...values,
            score: values.score || 0
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
