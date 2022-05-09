import fs from 'fs';
import { Company } from "../dto/company";

//company.json에서 company정보 받아서 객체배열로 생성후 return
export class CompanyDB{
    readComData():Array<Company>{
        let dataBuffer = fs.readFileSync('./data/company.json',{encoding:'utf-8'});
        let comjson = JSON.parse(dataBuffer);
        let coms : Array<Company> = [];
        comjson.forEach((c: { comcode: string; expdate: string; }) => {
          coms.push(new Company(c.comcode, c.expdate));  
        });
        return coms;
    }

    //회사코드로 만료기간 찾기
    findExpdate(comcode:string):string{
      const company :Array<Company>= this.readComData().filter(i=>i.comcode == comcode);
      return company[0].expdate;
    }
}