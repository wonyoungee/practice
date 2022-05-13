import { CompanyDao } from "../company/company_dao_file";

export class User {
    public id : string;
    public pw : string;
    public comcode : string;
    public permission : string;
    public logdate : string;
    public comExpdate : string;

    constructor(id:string,pw:string,comcode:string,permission:string,logdate:string){
        this.id = id;
        this.pw = pw;
        this.comcode = comcode;
        this.permission = permission;
        this.logdate = logdate;
        this.comExpdate = new CompanyDao().findExpdate(comcode);
    }
};

export interface IUserDao {
    getById(id: string): User;
    add(user: User): void;
    modify(user: User): void;
    read(): Array<User>;
}