import multer from 'multer'
import AppError from '../utils/AppError.js';

const storage = multer.diskStorage({});

const fileFilter = (req,file, cb) =>{
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new AppError("Only images are allowed to upload",400), false)
    }
}

export const upload = multer({
    storage,fileFilter
})