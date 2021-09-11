const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'imgs', 'perfil'),
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'public', 'imgs', 'perfil'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);
                file.perfil = hash.toString("hex")+'-'+file.originalname;
                cb(null, file.perfil);
            });
        },
    }),
    limits: {
        fileSize: 5242880,
    },
    fileFilter: (req, file, cb) =>{
        const allowedMimes =[
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new error('Formato de arquivo invalido.'))
        }
    }
};