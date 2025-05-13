import moongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await moongoose.connect("mongodb://localhost:27017/school");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;