const express = require('express');
const app = express();   // app에 express 서버를 만든다.
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');
// 서버 띄우기
app.listen(3000, function(){
  console.log("서버 가동");
});

// 템플릿 렌더링 위한 설정.
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())

app.get("/", function(req,res){
  res.sendFile(path.resolve('public/login.html'));
});

// 라우팅 구현 : 클라이언트가 URL로 접근하는 경로를 안내해주는 행위.
app.post('/login', function(req, res){
  let input = req.body;
  //fs.readFile('../data/user.json', 'utf8', (err, data)=>{
    //if(err) throw err
    //const user = JSON.parse(data);

    let dataBuffer = fs.readFileSync('./data/user.json')
    let dataJSON = dataBuffer.toString()
    let users = JSON.parse(dataJSON)

    let success = false;

    users.forEach( user=> {
      if(input.id == user.id && input.pw == user.pw){
        console.log("로그인 성공!");
        if(user.admin==true||user.permission=="w"){
          console.log("신규버튼 보이게");
          res.render('main', {write:true});
        } // 채워넣기. 신규버튼도 보이게.
        else{
          console.log("목록버튼만 보이게");
          res.render('main', {write:false});
        }
        success = true;
        return;
      }
    });
    if(success==false){
      console.log("로그인 실패!");
    }

})
//});