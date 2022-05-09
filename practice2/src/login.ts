let request_id = "admin";
let request_password = "admin";
import { LoginContext } from "./context/login_context";
import { Account_Status } from "./policies/login/account_status";
import { Contract_Period } from "./policies/login/contract_period";
import { Identifier } from "./policies/login/identifier";
import { ILoginPolicyResult, Policy } from "./policies/policy";
import { UserDB } from "../model/dao/userDB";

const loginContext:LoginContext = new LoginContext(request_id, request_password);

const policies:Array<Policy>=[new Identifier(), new Contract_Period(), new Account_Status()];
let success:boolean = true;
for(let i:number=0; i<policies.length; i++){
    const apply:ILoginPolicyResult = policies[i].apply(loginContext);
    if(!apply.status){
        console.log(apply.message);
        success = false;
        break;
    }
}
if(success) {
    console.log("로그인 성공!");
    new UserDB().LogLoginTime(loginContext);
}