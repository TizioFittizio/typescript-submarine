import {
    Controller,
    Get
} from '@tsed/common';
import { UserDTO } from 'models/dtos/UserDTO';
import { Constants } from 'config/Constants';

@Controller(Constants.CONTROLLER_USERS)
export class UserController {

    @Get(Constants.ROUTE_USERS_GET)
    private async getUsers(): Promise<UserDTO[]> {
        return [
            {
                name: '1',
                surname: '2',
                gender: 'male',
                score: 13
            },
            {
                name: '3',
                surname: '4',
                gender: 'female',
                score: 17
            }
        ];
    }

    // TODO
    // Casi d'uso CRUD
    // Exceptions
    // Middlewares

}