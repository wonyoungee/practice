import e from "express";
import express from "express";
import bodyParser from 'body-parser';
import { CompanyDao as CompanyDao_file } from "../model/company/company_dao_file";
import { CompanyDao as CompanyDao_db } from "../model/company/company_dao_db";
import { UserDao as UserDao_file } from "../model/user/user_dao_file";
import { UserDao as UserDao_db } from "../model/user/user_dao_db";
import { router_registry } from "../registry/router_registry";
import { IServerConfiguration } from "./configurations";
import { ExecutionContext } from "../context/execution_context";
import { router_filter_registry } from "../registry/router_filter_registry";

export const ServerFactory = {

    async create(config: IServerConfiguration): Promise<e.Express> {
        /* config 변수 안에 {
            database: "file",
            router: [LoginRouter, UserRouter],
            policy: {
                login: [AccountStatus, ContractPeriod, Identifier],
                // register: [Duplicate, LimitUserCount]
            },
        } */

        let userdao = config.database == "file" ? new UserDao_file() : new UserDao_db(); 
        let companydao = config.database == "file"? new CompanyDao_file() : new CompanyDao_db();

        const app = express();

        app.use(bodyParser.urlencoded({ extended : false }));
        app.use(bodyParser.json())
        
        
        /*
        for(const [path, router] of router_registry.entries()){
            app[router.method](path, async function(req,res){

                // 특정 요청에 대한 필터 등록 - 라우터 필터
                const routerFilters = router_filter_registry.get(router.target.name)
                for(const filter of routerFilters){
                    if(await filter()==false) res.status(403);
                }

                let context = new ExecutionContext(req, res, userdao, companydao);
                new router.target()[router.propertyKey](context)   //propertykey : 메소드이름

                // 필터체크하는방법??? => 나중에...
                // if(path=="/register/:user_id"){
                //     UserDao.getById(req.query._userid)
                // }// 이렇게 못할것.. path만으로는..

                // const filters = router_filter_registry.get(path) // permission 필터 체크하는 로직 필요..
                // for(const [path, filter] of filters.entries()){

                // }
            })
        }  */

        
        config.router.forEach((klass) => { // klass = LoginRouter 클래스
            const routerMap = router_registry.get(klass.name); //"UserRouter" : key
            console.log(routerMap);
            routerMap.paths.forEach(pathInfo => { // routerMap : {paths : [{}...]}
                app[pathInfo.method](pathInfo.url, (req: any, res: any) => { 
                    // app.get('/login', function(req, res){

                    //})
                    
                    
                    // if (pathInfo.filters) {
                    //     for(const filter of pathInfo.filters) {
                    //         if(await filter() === false) {
                    //             res.status(403);
                    //             return false;
                    //         }
                    //     }
                    // }
                    
                    // context 생성
                    let executionContext = new ExecutionContext(req, res, userdao, companydao);
                    // 라우터 연결
                    const router = new klass(); // router = new LoginRouter();
                    router[pathInfo.propertyKey](executionContext); // loginProcess(context);
                });
            });
        })

        return app;
    }
}