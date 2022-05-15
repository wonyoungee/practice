import moment from 'moment';
import { ExecutionContext } from '../context/execution_context';
import { get, post } from '../decorator';
import { User } from '../model/user/user';

export class LoginRouter {

    @get("/login")
    loginView(context: ExecutionContext) {
        console.log("get");
        console.log(context.req.body.request_id);
    }

    // ajax 요청 할것
    @post("/login")
    async loginProcess(context: ExecutionContext) {
        console.log(context.req.body.request_id);
        console.log(context.req.body.request_pw);
        console.log("post");

        const policies = await context.getLoginPolicy();
        try{
            await policies[0].apply(context);
            await policies[1].apply(context);
            await policies[2].apply(context);

            // 마지막 로그인 시각 기록
            let user : User = context.userDao.getById(context.req.body.request_id);
            user.logdate = moment().format("YYYY-MM-DD HH:mm:ss").toString();
            context.userDao.modify(user);

            //let permission = new permissionCheck().checkForMain(context); // 권한 체크
            //context.res.render('main', {read:permission[0], write:permission[1]});  // 모든 검증 완료 후 main으로 이동.
            console.log("로그인 성공");
        } catch(error:any){
            console.log(error);
            //context.res.render('login',{fail:error.message});
        }
    }
}