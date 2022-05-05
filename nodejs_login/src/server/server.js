const express = require('express');
const app = express();   // app에 express 서버를 만든다.
const bodyParser = require('body-parser');
const userDB = require('../../model/userDB');
const checkrule = require('../rules/checkRule');
let userdb = new userDB();
let checkrules = new checkrule();

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

// post login -> main.ejs
app.post('/login', function(req, res){
  /****** 아이디, 비번 유효성 검사 *****/
  let userdata = checkrules.identify(req.body.id, req.body.pw); //검증된 객체 반환
  if(userdata!=undefined){  // 존재하는 계정이면
    if(checkrules.validCode(userdata.comcode)){ //활성화된 회사인지 확인
      if(checkrules.activeIDCheck(userdata.logdate)){ //휴면계정인지 확인
        userdb.lastLoginLog(userdata); //마지막 로그인 시간 기록
        let permission = checkrules.permissionCheck(userdata.permission); // 권한 체크
        res.render('main', {write:permission[0], read:permission[1]});  // 모든 검증 완료 후 main으로 이동.
      }
      else res.render('login',{fail:2});
    }
    else res.render('login', {fail:3});
  }
  else res.render('login',{fail:1});
});

// get list
app.get("/list", function(req,res){
  res.render('list',{users:userdb.readUserData()});
});

// get register
app.get("/register", function(req, res){
  res.render('register', {result:""});
});

// post register
app.post("/register", function(req, res){
  if(checkrules.duplicateIDCheck(req.body.id)){ //중복ID 체크
    res.render('register', {result : "이미 존재하는 id입니다."});
  }
  else{ //userdb에 등록 진행
    userdb.addNewUser(req.body);
    res.render('register',{result: "등록이 완료되었습니다."});
  }
});