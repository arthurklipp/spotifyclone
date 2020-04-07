const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    'secret': '343ji43j4n3jn4jk3n',
    resave: false,
    saveUninitialized: true,
}))


app.post('/login', (req, res)=>{

    let email = req.body.email;
    let password = req.body.password;  
    
    if(email == "arthur@gmail.com" && password == "123"){
        req.session.logged = true;
        res.send({autorized: true, message:"Logado com sucesso!"});

    }else{
        res.send({autorized: false, message:"Usuário ou senha incorretos"});
    }    
})




//MIDLEWARE QUE VERIFICA SE O USUÁRIO ESTÁ LOGADO
app.use((req, res, next)=>{
    if(!req.session.logged){
        res.send({message: "Você precisa realizar o login para ver esta página"})
    }else{
        next();
    }
})




app.listen(8080, ()=>{
    console.log('Server start at localhost:8080');
})