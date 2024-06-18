import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('DB already connected');
        return;
    }

    try {
        console.log('Attempting to connect to database...');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompts',
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('DB is connected');
    } catch (error) {
        console.error('DB connection error:', error.message);
    }
};
