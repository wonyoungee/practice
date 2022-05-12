////////////////// Message 전달 ///////////////////////////////////

class MessageBroker{
    table : Map<any, any>;
    constructor(){
        this.table = new Map();
    }

    publish(responseId, data){
        if(this.table.has(responseId)){
            const subscriber = this.table.get(responseId);
            subscriber(data);
        }
    }
    subscribe(key, subscriber){
        this.table.set(key,subscriber);
    }
}

const Broker = new MessageBroker();

window.addEventListener("message",function(event){
    if(event.data.responseId != undefined){
        Broker.publish(event.data.responseId, event.data.user);
    }
});

const ecount = {
    popup : function(url:string, name:string, option:string){
        return new Promise(function(resolve, reject){
            const responseId:string = Date.now().toString();

            Broker.subscribe(responseId, resolve);
            window.open(`${url}?responseId=${responseId}`, name, option);
        });
    }
};


//////////////////////////////// Decorator Popup///////////////////////////////////////

class ActionBroker{
    table : Map<string, Function>;
    constructor(){
        this.table = new Map();
    }

    produce(id:string){
        if(this.table.has(id)){
            const func = this.table.get(id);
            func();
        }
    }
    subscribe(key:string, executefunc:Function){
        this.table.set(key, executefunc);
    }
}

const actionBroker = new ActionBroker();

/////////// 버튼 클릭으로 팝업창 열기 /////////////

window.addEventListener("click", (e:MouseEvent)=>{
    if(actionBroker.table.has(`/click/${(e.target as HTMLButtonElement).id}`)){
        actionBroker.produce(`/click/${(e.target as HTMLButtonElement).id}`);
    }
})

const ListenClickEvent = function Listen(path: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        actionBroker.subscribe(`/click/${path}`, function(){
            const subscriber = new target();
            subscriber.execute(ecount);
        })
    };
};

////////////// F8로 팝업창 열기 ////////////////

window.addEventListener("keydown", (e)=>{
    if(actionBroker.table.has(`/keydown/${e.key}`)){
        actionBroker.produce(`/keydown/${e.key}`);
    }
})

const ListenKeyEvent = function Listen(path: string[]): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        actionBroker.subscribe(`/keydown/${path[0]}`, function(){
            const subscriber = new target();
            subscriber.execute(ecount);
        })
    };
};

// decorator
@ListenClickEvent("newbtn")
@ListenKeyEvent(["F8"])
class SalesSave{
    async execute(viewHandler){
        const message = await viewHandler.popup("/register","newbtnpopup","width:400, height:400");
        const welcome = message.id+"님 환영합니다.\n회사코드 : " + message.comcode + "\n권한 : "+message.permission+"\n마지막 로그인 시각 : "+message.logdate;
        alert(welcome);
    }
}

// 버튼들...
window.onload = function(){
    let listbtn:HTMLElement = document.getElementById("listbtn");
    if(listbtn!=null){
        listbtn.onclick = function(){
            console.log("dkdkdk");
            window.open('/list', "listbtnpopup","width:400, height:400");
        }
    }
    
    let alertbtn:HTMLElement = document.getElementById("alertbtn");
    if(alertbtn!=null){
        alertbtn.onclick = function(){
            alert("Read권한이 필요합니다.");
        }
    }
}