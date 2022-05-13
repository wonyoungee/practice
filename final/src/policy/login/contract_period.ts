import { ExecutionContext } from "../../context/execution_context";
import { allowComCode } from "../../decorator";
import { IPolicy, IPolicyResult } from "../policy";
import moment from "moment";

@allowComCode(["80000"]) // 정책패스
export class ContractPeriod implements IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult> {
        const expdate:string= context.userDao.read().filter(i=>i.id==context.req.body.request_id)[0].comExpdate;
        return new Promise((resolve, reject)=>{
            (moment(expdate)>moment()) ? resolve({status:true}) : reject({status:false, message:"로그인 실패! 계약기간 만료"});
        });
    }
}