export class RegisterContext {
    public req_id : string;
    public req_pw : string;
    public req_comcode : string;
    public req_admin : boolean;
    public req_permission : string;
    
    constructor(id:string, pw:string, comcode:string, admin:boolean, permission:string){
        this.req_id = id;
        this.req_pw = pw;
        this.req_comcode = comcode;
        this.req_admin = admin;
        this.req_permission = permission;
    }
}