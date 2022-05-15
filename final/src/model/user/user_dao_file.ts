import fs from "fs";

import { IUserDao, User } from "./user";

export class UserDao implements IUserDao {

    read(): Array<User>{
        let dataBuffer = fs.readFileSync('src/data/user.json',{encoding:'utf-8'});
        let userjson = JSON.parse(dataBuffer);

        let users : Array<User> = [];
        userjson.forEach((u: { id: string; pw: string; comcode: string; permission: string; logdate: string;}) => {
            users.push(new User(u.id, u.pw, u.comcode, u.permission, u.logdate));  
        });
        
        return users;
    }

    getById(id: string): User {
        return this.read().find(i=>i.id == id);
        //throw new Error("Method not implemented.");
    }

    add(user:User): void {
        let users : Array<User> = this.read();
        users.push(user); // 객체 추가
        fs.writeFileSync('src/data/user.json', JSON.stringify(users));
        //throw new Error("Method not implemented.");
    }
    modify(user: User): void{
        let users : Array<User> = this.read();
        let index:number = users.findIndex(i => i.id == user.id);
        users.splice(index,1);  // 기존객체 삭제
        fs.writeFileSync('src/data/user.json', JSON.stringify(users));
        this.add(user); // user.json에 수정된 배열 다시 write
    }
}