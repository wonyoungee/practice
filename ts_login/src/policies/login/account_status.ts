import { LoginContext } from "../../context/login_context";
import { ILoginPolicyResult, Policy } from "../policy";
import { UserDB } from "../../model/dao/userDB";
import { User } from "../../model/dto/user";
import moment from 'moment';

export class Account_Status extends Policy{
    public apply(context: LoginContext): ILoginPolicyResult {
        const users:Array<User> = new UserDB().readUserData();
        const logdate:string= users.filter(i=>i.id==context.request_id)[0].logdate;
        return (moment(logdate) > moment().subtract(30, 'days')) ? {status:true} : {status:false,message:"로그인 실패! 휴면계정입니다."};
    }
}