import { ILoginPolicyResult,Policy } from '../policy';
import { RegisterContext } from '../../context/register_context';
import {UserDB} from '../../model/dao/userDB';
import {User} from '../../model/dto/user';

export class Duplicate_ID extends Policy{
    public apply(context: RegisterContext): Promise<ILoginPolicyResult> {
        const users : Array<User> = new UserDB().readUserData();
        return new Promise((resolve, reject)=>{
            users.some(i => i.id == context.req_id) ? reject({status:true, message:"중복된 id입니다."}) : resolve({status:false});
        });
    }
}