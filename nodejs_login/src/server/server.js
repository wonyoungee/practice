//const express = require('constants');
const express = require('express')
const app = express()   // app에 express 서버를 만든다.
const port = 3000
var router = express.Router();
var controller_main = require("../controllers/login-controller");

var path = require('path');

app.use(express.static('public'));

//restful
//get 메서드 : read
//app : express 객체

//로그인 라우터
router.get("/login", function(req, res){
  res.sendFile(path.join(__dirname, "public/login.html"))
});

router.post("/login", async function(req, res){
  // 로그인 확인을 위해 컨트롤러 호출
  var result = await controller_main.SignIn(req, res);
  res.send(result);
});

module.exports = router;

/*
// 첫화면
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/login.html'));
})

app.get('')
*/
app.listen(port, () => {    // listen을 통해 서버 실행
  console.log(`Example app listening on port ${port}`)
})
