const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect('mongodb+srv://admin:<password>@nextoys-db.l5gsm.mongodb.net/<dbname>?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    mongoose.connection.on('open', () =>{
        console.log('Veritabanı bağlantısı sağlandı.');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Veritabanı bağlantı hatası...', err);
    });

    mongoose.Promise = global.Promise;
}
