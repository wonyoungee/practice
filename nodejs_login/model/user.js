//const Company = require('./company');

class User {
    constructor(id,pw,comcode,admin,permission,logdate){
        this.id = id;
        this.pw = pw;
        this.comcode = comcode;
        this.admin = admin;
        this.permission = permission;
        this.logdate = logdate;
    }
};

module.exports = User;