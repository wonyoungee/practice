export class LoginContext {
    public request_id : string;
    public request_pw : string;
    
    constructor(id:string, pw:string){
        this.request_id = id;
        this.request_pw = pw;
    }
}