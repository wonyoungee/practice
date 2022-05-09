let request_id = "admin";
let request_password = "admin";
import { LoginContext } from "./context/login_context";
import { Account_Status } from "./policies/login/account_status";
import { Contract_Period } from "./policies/login/contract_period";
import { Identifier } from "./policies/login/identifier";
import { ILoginPolicyResult, Policy } from "./policies/policy";
import { UserDB } from "./model/dao/userDB";


const policies:Array<Policy>=[new Identifier(), new Contract_Period(), new Account_Status()];
const loginContext:LoginContext = new LoginContext(request_id, request_password);

// async-await 사용하기
async function loginProcess(context : LoginContext){
    try{
        await policies[0].apply(context);
        await policies[1].apply(context);
        await policies[2].apply(context);
        console.log("로그인 성공");
    } catch(error:any){
        console.log(error.message);
    }
}

(async () => {
    await loginProcess(loginContext);
})();



/*
// Promise 사용하기
policies[0].apply(loginContext)
.then(function(){
    return policies[1].apply(loginContext);
})
.then(function(){
    return policies[2].apply(loginContext);
})
.then(function(){
    console.log("로그인 성공");
})
.catch(result => console.log(result.message));
*/



/*
// 원래코드
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
*/