import e from "express";
import { ICompayDao } from "../model/company/company";
import { IUserDao } from "../model/user/user";
import { IPolicy } from "../policy/policy";

import { AccountStatus } from "../policy/login/account_status";
import { ContractPeriod } from "../policy/login/contract_period";
import { Identifier } from "../policy/login/identifier";

import { Duplicate } from "../policy/register/duplicate";
import { LimitUserCount } from "../policy/register/limit_user_count";

export interface IRequestBody{
    request_id : string;
    request_pw : string;
    //
    request_comcode : string;
    request_permission : string;
}

export class ExecutionContext {
    constructor(
        public req: e.Request<any, any, IRequestBody>, 
        public res: e.Response, 
        public userDao: IUserDao, 
        public companyDao: ICompayDao) {
    }

    async getLoginPolicy(): Promise<IPolicy[]> {
        return [new AccountStatus(), new ContractPeriod(), new Identifier()]
    }

    async getRegisterPolicy(): Promise<IPolicy[]> {
        return [new Duplicate(), new LimitUserCount()];
    }
}