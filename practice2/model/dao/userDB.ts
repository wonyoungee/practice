import fs from "fs";
import moment from 'moment';
import { User } from "../dto/user";
import { LoginContext } from "../../src/context/login_context";

export class UserDB{
  //user.json에서 user정보 받아서 객체배열로 생성후 return
  readUserData(): Array<User>{
      let dataBuffer = fs.readFileSync('./data/user.json',{encoding:'utf-8'});
      let userjson = JSON.parse(dataBuffer);
      
      let users : Array<User> = [];
      userjson.forEach((u: { id: string; pw: string; comcode: string; admin: boolean; permission: string; logdate: string;}) => {
        users.push(new User(u.id, u.pw, u.comcode, u.admin, u.permission, u.logdate));  
      });
      
      return users;
  }

  writeUserData(data:Array<User>):void{
    fs.writeFileSync('./data/user.json', JSON.stringify(data)) // user.json에 덮어쓰기.
  }

  // 로그인 시각 기록
  LogLoginTime(context: LoginContext):void{
    let users:Array<User> = this.readUserData(); //userdb에서 객체배열 users 가져오기.
    // 유저객체 수정
    let index:number = users.findIndex(i => i.id == context.request_id);
    let user:Array<User> = users.filter(i=>i.id==context.request_id);
    users.splice(index,1);  // 기존객체 삭제
    user[0].logdate = moment().format("YYYY-MM-DD HH:mm:ss").toString(); // 유저 객체에 현재시간 업데이트
    users.push(user[0]); // 수정된 객체 추가
    this.writeUserData(users); // user.json에 수정된 배열 다시 write
  }
}