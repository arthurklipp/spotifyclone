const multer = require('multer');
const path = require('path');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'imgs', 'playlist'),
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'public', 'imgs', 'playlist'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
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