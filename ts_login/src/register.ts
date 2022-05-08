const req_id = "active";
const req_pw = "active";
const req_comcode = "80000";
const req_isAdmin = false;
const req_permission = "r";
import {RegisterContext} from "./context/register_context";
import { ILoginPolicyResult} from "./policies/policy";
import { Duplicate_ID } from './policies/register/Duplicate_ID';
import {UserDB} from '../model/dao/userDB';

const register_context:RegisterContext = new RegisterContext(req_id,req_pw,req_comcode,req_isAdmin,req_permission);

const duplicate_id:ILoginPolicyResult = new Duplicate_ID().apply(register_context);
if(duplicate_id.status) console.log(duplicate_id.message);
else { // 중복값 없으면 등록
    new UserDB().addNewUser(register_context);
    console.log("등록이 완료되었습니다!");
}