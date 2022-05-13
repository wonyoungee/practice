import { ExecutionContext } from "../../context/execution_context";
import { allowComCode } from "../../decorator";
import { IPolicy, IPolicyResult } from "../policy";

@allowComCode(["80000"]) // 정책패스
export class LimitUserCount implements IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult> {
        const limitcount:number = context.companyDao.read().find(i=>i.comcode == context.req.body.request_comcode).limituser
        return null;
    }
}