import { LoginContext } from "../context/login_context";
import { RegisterContext } from '../context/register_context';

//export interface ILoginPolicyResult {}

export interface ILoginPolicyResult {
    status: boolean;
    message?: string; // ? : 설정을 해도 되고 안해도 되는 값
}

export abstract class Policy {
    public abstract apply(context: LoginContext|RegisterContext): Promise<ILoginPolicyResult>;
}