"use strict";
////////////////// Message 전달 ///////////////////////////////////
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MessageBroker = /** @class */ (function () {
    function MessageBroker() {
        this.table = new Map();
    }
    MessageBroker.prototype.publish = function (responseId, data) {
        if (this.table.has(responseId)) {
            var subscriber = this.table.get(responseId);
            subscriber(data);
        }
    };
    MessageBroker.prototype.subscribe = function (key, subscriber) {
        this.table.set(key, subscriber);
    };
    return MessageBroker;
}());
var Broker = new MessageBroker();
window.addEventListener("message", function (event) {
    if (event.data.responseId != undefined) {
        Broker.publish(event.data.responseId, event.data.user);
    }
});
var ecount = {
    popup: function (url, name, option) {
        return new Promise(function (resolve, reject) {
            var responseId = Date.now().toString();
            Broker.subscribe(responseId, resolve);
            window.open("".concat(url, "?responseId=").concat(responseId), name, option);
        });
    }
};
//////////////////////////////// Decorator Popup///////////////////////////////////////
var ActionBroker = /** @class */ (function () {
    function ActionBroker() {
        this.table = new Map();
    }
    ActionBroker.prototype.produce = function (id) {
        if (this.table.has(id)) {
            var func = this.table.get(id);
            func();
        }
    };
    ActionBroker.prototype.subscribe = function (key, executefunc) {
        this.table.set(key, executefunc);
    };
    return ActionBroker;
}());
var actionBroker = new ActionBroker();
/////////// 버튼 클릭으로 팝업창 열기 /////////////
window.addEventListener("click", function (e) {
    if (actionBroker.table.has("/click/".concat(e.target.id))) {
        actionBroker.produce("/click/".concat(e.target.id));
    }
});
var ListenClickEvent = function Listen(path) {
    return function (target, propertyKey, descriptor) {
        actionBroker.subscribe("/click/".concat(path), function () {
            var subscriber = new target();
            subscriber.execute(ecount);
        });
    };
};
////////////// F8로 팝업창 열기 ////////////////
window.addEventListener("keydown", function (e) {
    if (actionBroker.table.has("/keydown/".concat(e.key))) {
        actionBroker.produce("/keydown/".concat(e.key));
    }
});
var ListenKeyEvent = function Listen(path) {
    return function (target, propertyKey, descriptor) {
        actionBroker.subscribe("/keydown/".concat(path[0]), function () {
            var subscriber = new target();
            subscriber.execute(ecount);
        });
    };
};
// decorator
var SalesSave = /** @class */ (function () {
    function SalesSave() {
    }
    SalesSave.prototype.execute = function (viewHandler) {
        return __awaiter(this, void 0, void 0, function () {
            var message, welcome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, viewHandler.popup("/register", "newbtnpopup", "width:400, height:400")];
                    case 1:
                        message = _a.sent();
                        welcome = message.id + "님 환영합니다.\n회사코드 : " + message.comcode + "\n권한 : " + message.permission + "\n마지막 로그인 시각 : " + message.logdate;
                        alert(welcome);
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesSave = __decorate([
        ListenClickEvent("newbtn"),
        ListenKeyEvent(["F8"])
    ], SalesSave);
    return SalesSave;
}());
// 버튼들...
window.onload = function () {
    var listbtn = document.getElementById("listbtn");
    if (listbtn != null) {
        listbtn.onclick = function () {
            console.log("dkdkdk");
            var child = window.open('/list', "listbtnpopup", "width:400, height:400");
        };
    }
    var alertbtn = document.getElementById("alertbtn");
    if (alertbtn != null) {
        alertbtn.onclick = function () {
            alert("Read권한이 필요합니다.");
        };
    }
};
//# sourceMappingURL=sales_save.js.map