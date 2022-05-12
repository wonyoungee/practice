import { LoginContext } from "../../context/login_context";
import { ILoginPolicyResult, Policy } from "../policy";
import { UserDB } from "../../model/dao/userDB";
import { User } from "../../model/dto/user";
import moment from 'moment';

export class Account_Status extends Policy{
    public apply(context: LoginContext): Promise<ILoginPolicyResult> {
        const users:Array<User> = new UserDB().readUserData();
        const logdate:string= users.filter(i=>i.id==context.request_id)[0].logdate;
        return new Promise((resolve, reject)=>{
            (moment(logdate) > moment().subtract(30, 'days')) ? resolve({status:true}) : reject({status:false,message:"로그인 실패! 휴면계정입니다."});
        });
    }
}