export const ListenKeyEvent = function Listen(path: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        debugger;
    };
};

@ListenClickEvent("btn_register")
@ListenKeyEvent(["F8"])
export class SalesSave {

    async execute(viewHandler) {
        const mesage = await viewHandler.popup("", "")
        viewHadnler.alert(mesage)
    }
}

@Listen("/click/sales_save2")
export class SalesSave2 {

    execute() {

    }
}

@Listen("/click/sales_save3")
export class SalesSave3 {

    execute() {

    }
}