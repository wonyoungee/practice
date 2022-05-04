const express = require('express');
const app = express();   // app에 express 서버를 만든다.
const bodyParser = require('body-parser');
const fs = require('fs');

const userdb = require('../../model/userDB');
const contractrule = require('../../rules/contractRule');
const loginrule = require('../../rules/loginRule');
const permissionrule = require('../../rules/permissionRule');
let loginrules = new loginrule();
let contractrules = new contractrule();
let permissionrules = new permissionrule();

// 서버 띄우기
app.listen(3000, function(){
  console.log("서버 가동");
});

// 템플릿 렌더링 위한 설정.
app.set("views", "./views");
app.set("view engine", "ejs");

// bodyParser
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())

// home화면-login화면
app.get("/", function(req,res){
  res.render('login',{fail:0});
});

//////////////////////////////////////////////////////////////////////


// post login -> main.ejs
app.post('/login', function(req, res){

  /****** 아이디, 비번 유효성 검사 *****/
  let inputID = req.body.id;
  let inputPW = req.body.pw;
  let userdata = loginrules.identify(inputID, inputPW); //검증된 객체 반환
  if(userdata!=undefined){  // 존재하는 계정이면
    console.log("로그인 성공!");

    /***** 활성화된 회사인지 확인 *****/
    if(contractrules.validCode(userdata.comcode)){
      console.log("활성화된 회사코드입니다.");

      /***** 휴면계정인지 확인 *****/
      if(loginrules.activeIDCheck(userdata.logdate)){
        console.log("휴면계정이 아닙니다.");

        /*****   마지막 로그인 시간 기록  *****/
        loginrules.lastLoginLog(userdata);

        /***** 모든 로그인 검증 끝나면 권한 정보 메인에 넘기기 *****/
        let permission = permissionrules.permissionCheck(userdata.permission);
        res.render('main', {write:permission[0], read:permission[1]});
      }
      else{
        console.log("휴면계정입니다.");
      }
    }
    else{
      console.log("로그인 실패! 비활성화된 회사 코드입니다.");
    }
  }
  else{
    console.log("로그인 실패!");
  }
});

// get list
app.get("/list", function(req,res){
  let users = userdb.readUserData();
  res.render('list',{users:users});
});

///////////////////////////////////////////////////////////////////////////////

// get register
app.get("/register", function(req, res){
  res.render('register', {result:""});
});

// post register
app.post("/register", function(req, res){
  //중복확인
  let success = true;
  let input = req.body;
  fs.readFile('./data/user.json', 'utf8', (err, data)=>{
    if(err) throw err
    let users = JSON.parse(data)

    users.forEach(user => {
      if(input.id==user.id){
        let result = "이미 존재하는 id입니다.";
        success = false;
        res.render('register',{result:result});
        return;
      }
    });

    // 중복값이 없다면 실행
    if(success){
      let account = {};
      let result = "?";
      if(input.id=="" || input.pw==""){
        result = "등록실패! id 또는 pw를 입력하지 않았습니다.";
      }
      else{
        account.id = input.id;
        account.pw = input.pw;
        account.comcode = input.comcode;
        if(input.admincheck){ //true
          account.admin = true;
          account.permission = "rw";
        }
        else{
          account.admin = false;
          account.permission = ""
          if(typeof(input.permission)=="object"){
            input.permission.forEach(per => {
              account.permission += per;
            });
          }
          else {
            account.permission += input.permission;
          }
        }
        users.push(account);
        let data = JSON.stringify(users);
  
        fs.writeFile('./data/user.json', data,'utf8', (err)=>{ 
          if (err) throw err;
        });
        result = "등록이 완료되었습니다."
      }
      res.render('register',{result:result});
    }
  });
});