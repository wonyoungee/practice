import { ExecutionContext } from "../context/execution_context";

export interface IPolicyResult {
    status: boolean; 
    message?: string;
}

export interface IPolicy {
    apply(context: ExecutionContext): Promise<IPolicyResult>;
}
