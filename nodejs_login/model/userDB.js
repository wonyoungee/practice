const fs = require('fs');
const user = require('../model/user');
var moment = require('moment');

class UserDB{
  //user.json에서 user정보 받아서 객체배열로 생성후 return
  readUserData(){
      let dataBuffer = fs.readFileSync('./data/user.json');
      let dataJSON = dataBuffer.toString();
      let userjson = JSON.parse(dataJSON);
      let users = [];
      userjson.forEach(u => {
        users.push(new user(u.id, u.pw, u.comcode, u.admin, u.permission, u.logdate));  
      });
      return users;
  }

  // user.json에 userdata 덮어쓰기
  writeUserdata(data){
    const jsondata = JSON.stringify(data)
    fs.writeFileSync('./data/user.json', jsondata) // user.json에 덮어쓰기.
  }

  /***** 마지막 로그인 시간 기록 *****/
  lastLoginLog(userdata){
    let users = this.readUserData(); //userdb에서 객체배열 users 가져오기.
    // 유저객체 수정
    let index = users.findIndex(i => i.id == userdata.id);
    users.splice(index,1);  // 기존객체 삭제
    userdata.logdate = moment().format("YYYY-MM-DD HH:mm:ss"); // 유저 객체에 현재시간 업데이트
    users.push(userdata); // 수정된 객체 추가
    this.writeUserdata(users); // user.json에 수정된 배열 다시 write
  }

  /***** 새로운 user 추가*****/
  addNewUser(input){
    let permission = ""
    permission += (input.admincheck || typeof(input.permission)=="object") ? "rw" : input.permission; // 권한체크
    let users = this.readUserData();
    users.push(new user(input.id, input.pw,input.comcode, input.admin, permission, moment().format("YYYY-MM-DD HH:mm:ss")));
    this.writeUserdata(users);
  }
}

module.exports = UserDB;