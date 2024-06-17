import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('DB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompts',
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('DB is connected');
    } catch {
        console.log('DB not connected');
    }
}