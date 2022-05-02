var service_main = require("../service/login-service"); 
// 회원로그인 컨트롤러 
exports.SignIn = async function(req,res){ 
    console.log(req.body); 
    var result = await service_main.SignIn(req);
    return result;
}