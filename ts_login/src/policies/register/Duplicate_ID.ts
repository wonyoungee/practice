import { ILoginPolicyResult,Policy } from '../policy';
import { RegisterContext } from '../../context/register_context';
import {UserDB} from '../../../model/dao/userDB';
import {User} from '../../../model/dto/user';

export class Duplicate_ID extends Policy{
    public apply(context: RegisterContext): ILoginPolicyResult {
        const users : Array<User> = new UserDB().readUserData();
        return users.some(i => i.id == context.req_id) ? {status:true, message:"중복된 id입니다."} : {status:false}
    }
}