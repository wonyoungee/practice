import { ExecutionContext } from "../../context/execution_context";
import { IPolicy, IPolicyResult } from "../policy";

export class Identifier implements IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult> {
        /***** id, pw 비교 *****/
        return new Promise((resolve, reject)=>{
            context.userDao.read().some(i=> (i.id == context.req.body.request_id && i.pw == context.req.body.request_pw)) ? resolve({status:true}) : reject({status:false, message:"로그인 실패! 존재하지 않는 계정입니다."});
        });
    }
}