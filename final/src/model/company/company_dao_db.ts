import { Company, ICompayDao } from "./company";

export class CompanyDao implements ICompayDao {
    findExpdate(com_code: string): string {
        throw new Error('Method not implemented.');
    }
    read(): Company[] {
        throw new Error('Method not implemented.');
    }


}