const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const secret = 'shhh!';
// const session = require('express-session');

const app = express();

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', (req, res)=>{
    if(!req.headers.authorization){
        res.send("Nenhuma credencial enviada!");
    }else{
        //pega o token do basic authorization que veio no header da requisição
        const [hashType, hash] = req.headers.authorization.split(' ');
        
        //converte o token do header para termos acesso aos dados do usuário(credential[0] = email e credential[1] = password)
        const credentials = Buffer.from(hash, 'base64').toString().split(':');
        
        if(credentials[0] == "arthur@gmail.com" && credentials[1]=='123'){
            const userid = 1;
            const token = jwt.sign({userid}, secret);
            res.send({auth: true, token: token});

        }else{
            res.send('Login inválido!');
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

app.get('/teste', (req, res)=>{
    console.log("ID DO USUÁRIO: ", req.userId);
    res.send("Recurso enviado!!");
})



// Example fetch with authorization header:

// fetch('URL_GOES_HERE', { 
//    method: 'post', 
//    headers: new Headers({
//      'Authorization': 'Basic '+btoa('username:password'), 
//      'Content-Type': 'application/x-www-form-urlencoded'
//    }), 
//    body: 'A=1&B=2'
//  });






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