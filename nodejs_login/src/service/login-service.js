exports.SignIn = async function(req){
    var userid = req.body.userid;
    var password = req.body.password;
    var fs = require("fs")
    fs.readFile('./data/user.json', 'utf8', (err, data)=>{
        if(err) throw err
        const user = JSON.parse(data);
        if(userid == user.id && password == user.pw){
            alert("로그인 성공");
        }
        else{alert("로그인 실패");}
    })
}