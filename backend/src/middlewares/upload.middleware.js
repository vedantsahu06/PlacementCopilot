import multer from 'multer';
import AppError from '../utils/appError.js';

const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },

    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    } 


})

function fileFilter(req,file,cb){

    console.log({
        name: file.originalname,
        mimetype: file.mimetype
    });

    if(file.mimetype === "application/pdf"){
        cb(null,true)
    }    else{
        cb(new AppError('Only PDF files are allowed',400),false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
},
    fileFilter: fileFilter

})


export default upload;