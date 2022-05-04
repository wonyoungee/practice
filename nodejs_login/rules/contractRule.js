const comdb = require('../model/companyDB');
var moment = require('moment');

class ContractRule{
    /***** 활성화된 회사인지 확인 *****/
    validCode(comcode){
        //comdb에서 객체배열 coms 가져오기.
        let coms = comdb.readComData();
        let expdate = coms.find(i=>i.comcode == comcode).expdate;   // 해당 회사의 만료일
        if(moment(expdate)<moment()){   // 만료된 회사코드면
            return false;
        }
        return true;
    }
}

module.exports = ContractRule;