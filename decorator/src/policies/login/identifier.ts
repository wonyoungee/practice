import {LoginContext} from "../../context/login_context"
import {ILoginPolicyResult, Policy} from "../policy"
import { UserDB } from "../../model/dao/userDB"
import { User } from "../../model/dto/user";

export class Identifier extends Policy{
    public apply(context: LoginContext): Promise<ILoginPolicyResult> {
        /***** id, pw 비교 *****/
        let userdb : UserDB = new UserDB();
        let users:Array<User> = userdb.readUserData();
        return new Promise((resolve, reject)=>{
            users.some(i=> (i.id == context.request_id && i.pw == context.request_pw)) ? resolve({status:true}) : reject({status:false, message:"로그인 실패! 존재하지 않는 계정입니다."});
        });
    }
}