import mongoose from "mongoose";


type ConnectionObject = {
    isConnected? : number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB");
        console.log(db);
        console.log(db.connections);
        
    } catch (error) {
        console.log("Error connecting to MongoDB : ", error);
        process.exit(1);
    }
    
}

export default dbConnect;