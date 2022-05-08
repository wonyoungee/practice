import { LoginContext } from "./context/login_context";
import { Account_Status } from "./policies/login/account_status";
import { Contract_Period } from "./policies/login/contract_period";
import { Identifier } from "./policies/login/identifier";
import { ILoginPolicyResult, Policy } from "./policies/policy";
import { UserDB } from "../model/dao/userDB";

const policies:Array<Policy>=[new Identifier(), new Contract_Period(), new Account_Status()];
let success:boolean = true;
const test_id:Array<string> = ["expacc", "expcom", "existacc"];
const test_pw:Array<string> = ["expacc", "expcom", "existacc"];
const test:Array<string> = ["휴면계정 테스트", "만료된 회사코드 테스트", "존재하지 않는 계정 테스트"];

for(let j:number=0; j<test_id.length; j++){
    const loginContext:LoginContext = new LoginContext(test_id[j], test_pw[j]);
    console.log("\n",test[j]);
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
}