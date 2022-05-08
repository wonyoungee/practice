import { UserDB } from '../model/dao/userDB';

console.log("<User List>")
new UserDB().readUserData().forEach(user => {
    console.log("--------------------------------------");
    console.log("ID : ",user.id);
    console.log("PW : ",user.pw);
    console.log("Comcode : ", user.comcode);
    console.log("IsAdmin : ", user.admin);
    console.log("Permission : ", user.permission);
});