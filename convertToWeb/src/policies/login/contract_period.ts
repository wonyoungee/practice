import {LoginContext} from "../../context/login_context"
import {ILoginPolicyResult, Policy} from "../policy"
import { UserDB } from "../../model/dao/userDB";
import { User } from "../../model/dto/user";
import moment from 'moment';

export class Contract_Period extends Policy{
    public apply(context: LoginContext): Promise<ILoginPolicyResult> {
        const users:Array<User> = new UserDB().readUserData();
        const expdate:string= users.filter(i=>i.id==context.request_id)[0].comExpdate;
        return new Promise((resolve, reject)=>{
            (moment(expdate)>moment()) ? resolve({status:true}) : reject({status:false, message:"로그인 실패! 계약기간 만료"});
        });
    }
}