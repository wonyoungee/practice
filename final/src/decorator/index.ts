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
        router_registry.set(target.constructor.name,
            {paths: 
                [{
                    url: path,
                    method: "get",
                    propertyKey: propertyKey,
                    filter: [{}]
                }]
            }
        )
        //     method: "get",
        //     target: target.constructor,
        //     propertyKey //메소드 이름
    }
}

export const post = function(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        router_registry.get(target.constructor.name).paths.push(
            {
                url: path,
                method: "post",
                propertyKey: propertyKey,
                filter: [{}]
            }
        )
    }
}

export const permission = function(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //permission의 정책
    }
}

export const allowComCode = function(com_code: string[]):any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}
