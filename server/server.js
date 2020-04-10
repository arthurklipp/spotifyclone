const express = require('express');
const bodyParser = require('body-parser');


const authController = require('./src/controllers/authController');

const app = express();

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
   
    next();
});


app.use('/', authController);


//midleware de autenticação
app.use((req, res, next)=>{
    const token = req.headers['access-token'];
    if(!token) return res.send({auth: false, message: "To token provided"});

    jwt.verify(token, secret, (err, decoded)=>{
        if(err) res.send({auth: false, message: "Falha na autenticação"});
        console.log(decoded);
        req.userId = decoded.userid
        next();
    })
})








//MIDLEWARE QUE VERIFICA SE O USUÁRIO ESTÁ LOGADO
// app.use((req, res, next)=>{
//     if(!req.session.logged){
//         res.redirect('http://localhost:3000')//redireciona pra pagina de login
//     }else{
//         next();
//     }
// })




app.listen(8080, ()=>{
    console.log('Server start at localhost:8080');
})