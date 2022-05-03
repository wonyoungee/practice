const express = require('express');
const app = express();   // app에 express 서버를 만든다.
const bodyParser = require('body-parser');
const fs = require('fs');
var moment = require('moment');
//const { type } = require('express/lib/response');
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
  res.render('login',{fail:false});
});

// post login -> main.ejs
app.post('/login', function(req, res){
  let input = req.body;
  fs.readFile('./data/user.json', 'utf8', (err, data)=>{
    if(err) throw err
    const users = JSON.parse(data);

    let success = false;

    users.forEach( user=> {
      if(input.id == user.id && input.pw == user.pw){
        console.log("로그인 성공!");
        // 마지막 로그인 시간 기록
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"));  // 현재시간
        let now = moment().format("YYYY-MM-DD HH:mm:ss");
        user.logdate = now;
        console.log(user);

        if(user.permission=="rw"){
          res.render('main', {write:true, read:true});
        }
        else if(user.permission=="w"){
          res.render('main', {write:true, read:false});
        }
        else if(user.permission=="r"){
          res.render('main', {write:false, read:true});
        }
        else{
          res.render('main', {write:false, read:false});
        }
        success = true;
        return;
      }
    });
    if(success==false){
      res.render('login', {fail:true});
    }
  })
});

// get list
app.get("/list", function(req,res){
  fs.readFile('./data/user.json', 'utf8', (err, data)=>{
    if(err) throw err
    const users = JSON.parse(data);
    res.render('list',{users:users});
  })
});

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