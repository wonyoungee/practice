import { IPolicy } from "../policy/policy";

type databaseSystem = "file" | "db";
export interface IServerConfiguration {
    router: any[];
    policy: {
        //[string] : IPolicy[]
    }
    database: databaseSystem;
}