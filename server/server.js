const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'shhh!';

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

//login com basic authorization
app.get('/login', (req, res)=>{
    if(!req.headers.authorization){
        res.send("Nenhuma credencial enviada!");
    }else{
        console.log(req.headers.authorization);
        //pega o token do basic authorization que veio no header da requisição
        const [hashType, hash] = req.headers.authorization.split(' ');
        console.log(hash);
        //converte o token do header para termos acesso aos dados do usuário(credential[0] = email e credential[1] = password)
        const credentials = Buffer.from(hash, 'base64').toString().split(':');
        
        if(credentials[0] == "arthur@gmail.com" && credentials[1]=='123'){
            const userid = 1;
            const token = jwt.sign({userid}, secret);
            res.send({auth: true, token: token});

        }else{
            res.send({auth: false, message:'Login inválido!'});
        }
    }
  
})

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