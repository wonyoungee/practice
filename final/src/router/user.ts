import e, { Router } from 'express';
import moment from 'moment';
import { ExecutionContext } from '../context/execution_context';
import { get, permission, post } from '../decorator';
import { User } from '../model/user/user';

//@Router() // 마지막에 호출
export class UserRouter {
    @get("/user/:userid")
    getUser(context: ExecutionContext) {
        
    }

    // ajax로 요청
    // admin만 등록가능
    @permission("admin")    //관리자 권한이 아닐 경우 해당 요청에 대한 응답 코드는 403로 처리
    @post("/register/:user_id") //user_id는 등록 요청을 한 계정의 id(로그인한 계정의 id)
    async registerUser(context: ExecutionContext) {
        const policies = await context.getRegisterPolicy();
        try{
            await policies[0].apply(context);
            await policies[1].apply(context);

            // 등록
            const user:User = new User(context.req.body.request_id, context.req.body.request_pw, context.req.body.request_comcode, context.req.body.request_permission, moment().format("YYYY-MM-DD HH:mm:ss").toString());
            context.userDao.add(user);

            console.log("등록 성공");
        } catch(error:any){
            console.log(error.message);
            //context.res.render('login',{fail:error.message});
        }
        // 정책 실팽
        // 결과 전송
    }

    @get("/user/register")
    registerUserView(context: ExecutionContext) {

    }

}
