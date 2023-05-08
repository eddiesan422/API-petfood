const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then((db)=>{
    console.log("Base de datos conectada");
}).catch((error)=>{
    console.log(error);
});

module.exports=mongoose;