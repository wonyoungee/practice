const userDB = require('../../model/userDB');
let userdb = new userDB();
const comDB = require('../../model/companyDB');
let comdb = new comDB();
var moment = require('moment');

class CheckRule{

    /****** 아이디, 비번 유효성 검사 *****/
    identify(inputID,inputPW){
        //userdb에서 객체배열 users 가져오기.
        let users = userdb.readUserData();
        return users.find(i=> (i.id == inputID && i.pw == inputPW));    // 유효한 객체 반환
    }

    /***** 휴면계정 검사 *****/
    activeIDCheck(logdate){
        return (moment(logdate) > moment().subtract(30, 'days'));    // active 계정.
    }

     /***** 활성화된 회사인지 확인 *****/
    validCode(comcode){
        //comdb에서 객체배열 coms 가져오기.
        let coms = comdb.readComData();
        let expdate = coms.find(i=>i.comcode == comcode).expdate;   // 해당 회사의 만료일
        return (moment(expdate)>moment());
    }

    /***** 권한 체크 *****/
    permissionCheck(permission){
        let result = [];
        result[0] = permission.includes("r") ? true : false;
        result[1] = permission.includes("w") ? true : false;
        return result;
    }

    /***** id중복검사 *****/
    duplicateIDCheck(inputID){
        let users = userdb.readUserData();
        return users.find(i=>i.id == inputID) ? true : false;
    }
}

module.exports = CheckRule;