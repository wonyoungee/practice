export class Company{
    public comcode : string;
    public expdate : string;
    public limituser : number;

    constructor(comcode:string, expdate:string, limituser: number){
        this.comcode = comcode;
        this.expdate = expdate;
        this.limituser = limituser;
    }
}

export interface ICompayDao {
    findExpdate(com_code: string): string;
    read() : Array<Company>;
    // async add(company: Company): void;
    // async modify(company: Company): void;
}