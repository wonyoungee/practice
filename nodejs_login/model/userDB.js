const fs = require('fs');
const user = require('../model/user');

module.exports = {
  //user.json에서 user정보 받아서 객체배열로 생성후 return
  readUserData : function(){
      let dataBuffer = fs.readFileSync('./data/user.json');
      let dataJSON = dataBuffer.toString();
      let userjson = JSON.parse(dataJSON);
      //console.log(users);
      let users = [];
      userjson.forEach(u => {
        users.push(new user(u.id, u.pw, u.comcode, u.admin, u.permission, u.logdate));  
      });
      return users;
  },
  writeUserdata : function(data){
    // user.json에 덮어쓰기.
    fs.writeFile('./data/user.json', data,'utf8', (err)=>{ 
      if (err) throw err;
    });
  }
}