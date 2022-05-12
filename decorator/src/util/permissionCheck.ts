import { LoginContext } from "../context/login_context";
import { UserDB } from "../model/dao/userDB";
import { User } from "../model/dto/user";


export class permissionCheck{
    checkForMain(context : LoginContext):Array<boolean>{
        let userdb : UserDB = new UserDB();
        let users:Array<User> = userdb.readUserData();
        const permission:string= users.filter(i=>i.id==context.request_id)[0].permission;
        let result:Array<boolean> = [];
        result[0] = permission.includes("r") ? true : false;
        result[1] = permission.includes("w") ? true : false;
        return result;
    }

    checkForRegister(admin:boolean, permission:any):string{
        let result:string = "";
        result += (admin || typeof(permission)=="object") ? "rw" : permission; // 권한체크
        return result;
    }
}