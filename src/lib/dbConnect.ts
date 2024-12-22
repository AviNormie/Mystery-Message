import mongoose from "mongoose";
// import { log } from "node:console";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to MongoDB");
        return    
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{});   
        connection.isConnected = db.connections[0].readyState;
        console.log("DB CONNECTED Successfully");
        
    } catch (error) {
        console.log("DB CONNECT Failed");
        process.exit(1);
        
    }
}

export default dbConnect;