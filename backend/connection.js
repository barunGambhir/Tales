const { SocketAddress } = require('net');
const mongoose = require('../frontend/node_modules/mongoose');
const connectDB = async()=>{
    try{
        //mongodb connection string
        //adding URI directly - need to configure .env file

        const con = await mongoose.connect("mongodb+srv://dummyuser:Theundertaker@cluster0.jk1ty4y.mongodb.net/cmpt372?retryWrites=true&w=majority") 
        //const con = await mongoose.connect("mongodb+srv://user2:sD2RysNG5KwJUgef@cluster0.0emyyud.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDb connected : ${con.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB

