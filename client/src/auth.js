export function isAuthenticated(){
    var login=JSON.parse(localStorage.getItem('login'));
    if(login.auth==true){
        return true;
    }else{
        return false;
    }
};