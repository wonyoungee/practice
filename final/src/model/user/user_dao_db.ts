import { IUserDao, User } from "./user";
import fs from 'fs';

export class UserDao implements IUserDao {
    getById(id: string): User {
        throw new Error("Method not implemented.");
    }
    add(user: User): void {
        throw new Error("Method not implemented.");
    }
    modify(user: User): void {
        throw new Error("Method not implemented.");
    }
    read(): Array<User>{

        throw new Error("Method not implemented.");
    }
}