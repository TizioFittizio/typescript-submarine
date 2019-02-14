import {
    Controller,
    Get
} from '@tsed/common';
import { User } from '../models/interfaces/User';

@Controller('/users')
export class UserController {

    @Get('/')
    private async getUsers(): Promise<User[]> {
      return [];
    }

    // TODO
    // Casi d'uso CRUD
    // Exceptions
    // Middlewares

}