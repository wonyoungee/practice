class PermissionRule {
    permissionCheck(permission){
        if(permission=="rw"){
            return [true, true];
          }
          else if(permission=="w"){
            return [true, false];
          }
          else if(permission=="r"){
            return [false, true];
          }
          else{
            return [false, false];
          }
    }
}

module.exports = PermissionRule;