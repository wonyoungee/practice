const fs = require('fs');
const company = require('./company');

//company.json에서 company정보 받아서 객체배열로 생성후 return
class CompanyDB {
    readComData(){
        let dataBuffer = fs.readFileSync('./data/company.json');
        let dataJSON = dataBuffer.toString();
        let comjson = JSON.parse(dataJSON);
        let coms = [];
        comjson.forEach(c => {
          coms.push(new company(c.comcode, c.expdate));  
        });
        return coms;
    }
}

module.exports = CompanyDB;