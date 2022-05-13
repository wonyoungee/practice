import { IPolicy, IPolicyResult } from "../policy";
import { ExecutionContext } from "../../context/execution_context";

export class Duplicate implements IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult> {
        return new Promise((resolve, reject)=>{
            context.userDao.read().some(i => i.id == context.req.body.request_id) ? reject({status:true, message:"중복된 id입니다."}) : resolve({status:false});
        });
    }
}