import { router_registry } from "../registry/router_registry"

// {
//     "UserRouter": {
//         paths: [
//             {
//                 url: "/login",
//                 method: "get",
//                 propertyKey: "login",
//                 filter: [{
//                     name: "permission",
//                     role: "admin"
//                 },{
//                     name: "allowUser",
//                     grade: "2"
//                 }]
//             }
//         ]
//     }
// }

export const get = function(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if(router_registry.get(target.constructor.name)==null){
            router_registry.set(target.constructor.name, {paths:[]})
        }
        let targetName = router_registry.get(target.constructor.name);

        targetName.paths.push({
            url: path,
            method: "get",
            propertyKey: propertyKey, //메소드 이름
            filter: []
        })
    }
}

export const post = function(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if(router_registry.get(target.constructor.name)==null){
            router_registry.set(target.constructor.name, {paths:[]})
        }
        let targetName = router_registry.get(target.constructor.name);
        
        targetName.paths.push({
            url: path,
            method: "post",
            propertyKey: propertyKey, //메소드 이름
            filter: []
        })
    }
}

export const permission = function(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //permission의 정책
        router_registry.get(target.constructor.name).paths.find(i=>i.propertyKey==propertyKey).filter.push({
            name: "permission",
            role: role
        })
        console.log(router_registry);
    }
}

export const allowComCode = function(com_code: string[]):any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
    }
}
