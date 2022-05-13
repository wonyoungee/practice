import { ExecutionContext } from "../../context/execution_context";
import { IPolicy, IPolicyResult } from "../policy";
import moment from "moment";

export class AccountStatus implements IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult> {
        const logdate:string= context.userDao.read().filter(i=>i.id==context.req.body.request_id)[0].logdate;
        return new Promise((resolve, reject)=>{
            (moment(logdate) > moment().subtract(30, 'days')) ? resolve({status:true}) : reject({status:false,message:"로그인 실패! 휴면계정입니다."});
        });
    }
}