const { SocketAddress } = require('net');
const mongoose = require('../frontend/node_modules/mongoose');
const connectDB = async()=>{
    try{
        //mongodb connection string
        //adding URI directly - need to configure .env file
        console.log(`MongoDb connected : ${con.connection.host}`)
        //Removed the connection string for MongoDB
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB

