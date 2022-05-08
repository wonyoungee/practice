import { CompanyDB } from "../dao/companyDB";

export class User {
    public id : string;
    public pw : string;
    public comcode : string;
    public admin : boolean;
    public permission : string;
    public logdate : string;
    public comExpdate : string;

    constructor(id:string,pw:string,comcode:string,admin:boolean,permission:string,logdate:string){
        this.id = id;
        this.pw = pw;
        this.comcode = comcode;
        this.admin = admin;
        this.permission = permission;
        this.logdate = logdate;
        this.comExpdate = new CompanyDB().findExpdate(comcode);
    }
};