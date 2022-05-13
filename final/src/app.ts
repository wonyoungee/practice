import { ServerFactory } from './server/express';

// router
import { LoginRouter } from "./router/login" 
import { UserRouter } from './router/user';

// policy
//   import { AccountStatus } from './policy/login/account_status';
//   import { ContractPeriod } from './policy/login/contract_period';
//   import { Identifier } from './policy/login/identifier';
// import { Duplicate } from './policy/register/duplicate;
// import { LimitUserCount } from './policy/register/limit_user_count;


async function bootstrap() {
    const port = 3000;
    const server = await ServerFactory.create({
        database: "file"/* db */,
        router: [LoginRouter, UserRouter],
        policy: {
            //login: [AccountStatus, ContractPeriod, Identifier],
            // register: [Duplicate, LimitUserCount]
        },
    }); // server = app
    await server.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
}
bootstrap();