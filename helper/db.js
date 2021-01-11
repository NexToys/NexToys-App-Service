const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect('mongodb+srv://admin:admin1234@nextoys-db.l5gsm.mongodb.net/nextoys-db?retryWrites=true&w=majority',{
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