const multer = require('multer');

const today = new Date();
const year = today.getFullYear();
const month = `${today.getMonth() + 1}`.padStart(2, "0");

const toystorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/uploads');
    },
    filename: (req,file,cb) => {
        console.log(file);
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + extension;
        cb(null,("toy" + '-' + uniqueSuffix));
    }
});

const profstorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads');
    },
    filename: (req,file,cb) => {
        console.log(file);
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + extension;
        cb(null,("profile" + '-' + uniqueSuffix));
    }
});

const fileFilter = (req,file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null,true);
    } else {
        cb(null,false);
    }
}
/* 
const uploadTPic = 

const uploadPPic =  */

exports.uploadTPic = multer({ storage:toystorage, fileFilter:fileFilter, limits: {
    fileSize: 3 * 1024 * 1024 // 2 MB
}});;
exports.uploadPPic = multer({storage:profstorage, fileFilter:fileFilter, limits: {
    fileSize: 48 * 256 * 256 // 2 MB
}});