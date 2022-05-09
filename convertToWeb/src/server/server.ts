import express from 'express'; 
class App { app: express.Application; constructor() { this.app = express(); } } 
const app = new App().app; // app에 express 서버를 만든다.
import bodyParser from 'body-parser';
import { UserDB } from '../model/dao/userDB';
import { LoginContext } from "../context/login_context";
import { Account_Status } from "../policies/login/account_status";
import { Contract_Period } from "../policies/login/contract_period";
import {Identifier} from '../policies/login/identifier';
import {Policy} from '../policies/policy'
import {permissionCheck} from '../util/permissionCheck';
import {Duplicate_ID} from '../policies/register/Duplicate_ID';
import {RegisterContext} from '../context/register_context';


// 서버 띄우기
app.listen(3000, function(){
  console.log("서버 가동");
});

// 템플릿 렌더링 위한 설정.
app.set("views", "./src/views");
app.set("view engine", "ejs");

// bodyParser
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())

// home화면-login화면
app.get("/", function(req:express.Request,res:express.Response){
  res.render('login',{fail:""});
});


// post login -> main.ejs
app.post('/login', function(req:express.Request,res:express.Response){

  const policies:Array<Policy>=[new Identifier(), new Contract_Period(), new Account_Status()];
  const loginContext:LoginContext = new LoginContext(req.body.id, req.body.pw);
  
  // async-await 사용하기
  async function loginProcess(context : LoginContext){
    try{
      await policies[0].apply(context);
      await policies[1].apply(context);
      await policies[2].apply(context);
      new UserDB().LogLoginTime(context); // 마지막 로그인 시각 기록
      let permission = new permissionCheck().checkForMain(context); // 권한 체크
      res.render('main', {read:permission[0], write:permission[1]});  // 모든 검증 완료 후 main으로 이동.
      console.log("로그인 성공");
    } catch(error:any){
        console.log(error.message);
        res.render('login',{fail:error.message});
    }
  }
  
  (async () => {
      await loginProcess(loginContext);
  })();
});

// get register
app.get("/register", function(req:express.Request,res:express.Response){
  res.render('register', {result:""});
});


// post register
app.post("/register", function(req:express.Request,res:express.Response){
  const input = req.body;
  const register_context:RegisterContext = new RegisterContext(input.id,input.pw,input.comcode,input.admin,input.permission);

  new Duplicate_ID().apply(register_context) //중복ID 체크
  .then(()=>{
    // userdb에 등록 진행
    new UserDB().addNewUser(register_context);
    res.render('register',{result: "등록이 완료되었습니다."});
  })
  .catch(result =>  res.render('register', {result : result.message}));
});


// get list
app.get("/list", function(req:express.Request,res:express.Response){
    res.render('list',{users:new UserDB().readUserData()});
});
