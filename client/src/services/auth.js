export function isAuthenticated(){

    const login=localStorage.getItem('login');

    if(login!==null){
        return true
    }else{
        return false
    }
};