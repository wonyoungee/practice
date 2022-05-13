import fs from 'fs';
import { Company, ICompayDao } from "./company";

export class CompanyDao implements ICompayDao {
    findExpdate(com_code: string): string {
        const company :Array<Company>= this.read().filter(i=>i.comcode == com_code);
        //throw new Error("Method not implemented.");
        return company[0].expdate;
    }
    read(): Array<Company> {
        let dataBuffer = fs.readFileSync('src/data/company.json',{encoding:'utf-8'});
        let comjson = JSON.parse(dataBuffer);
        let coms : Array<Company> = [];
        comjson.forEach((c: { comcode: string; expdate: string; limituser:number;}) => {
          coms.push(new Company(c.comcode, c.expdate, c.limituser));  
        });
        return coms;
        //throw new Error("Method not implemented.");
    }
}