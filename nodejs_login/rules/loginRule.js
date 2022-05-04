const userdb = require('../model/userDB');
var moment = require('moment');

class LoginRule{

    /****** 아이디, 비번 유효성 검사 *****/
    identify(inputID,inputPW){
        //userdb에서 객체배열 users 가져오기.
        let users = userdb.readUserData();
        //console.log(users);
        let user = users.find(i=> (i.id == inputID && i.pw == inputPW));
        return user;    // 유효한 객체 반환
    }

    /***** 휴면계정 검사 *****/
    activeIDCheck(logdate){
        if(moment(logdate) < moment().subtract(30, 'days')){  //30일 이내 로그인 기록이 없으면
            return false;   // 휴면계정임.
        }
        return true;    // active 계정.
    }

    /***** 마지막 로그인 시간 기록 *****/
    lastLoginLog(user){
        //userdb에서 객체배열 users 가져오기.
        let users = userdb.readUserData();
        user.logdate = moment().format("YYYY-MM-DD HH:mm:ss"); // 유저 객체에 현재시간 업데이트
        // 유저객체 수정
        users.splice(users.indexOf(user),1);  // 기존객체 삭제
        users.push(user); // 수정된 객체 추가
        let data = JSON.stringify(users);
        // user.json에 수정된 배열 다시 write
        userdb.writeUserdata(data);
    }
}
module.exports = LoginRule;