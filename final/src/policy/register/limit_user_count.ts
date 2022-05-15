import { ExecutionContext } from "../../context/execution_context";
import { allowComCode } from "../../decorator";
import { IPolicy, IPolicyResult } from "../policy";

@allowComCode(["80000"]) // 정책패스
export class LimitUserCount implements IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult> {
        return new Promise((resolve, reject)=>{
            const limitcount:number = context.companyDao.read().find(i=>i.comcode == context.req.body.request_comcode).limituser;
            let count : number = 0;
            context.userDao.read().forEach(user => {
                if(user.comcode==context.req.body.request_comcode) count++;
            });
            count==limitcount? reject({status:true, message:"제한된 등록인원을 초과하였습니다."}) : resolve({status:false});
        });
    }
}