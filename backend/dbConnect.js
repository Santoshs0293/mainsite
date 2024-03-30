const mongoose = require("mongoose");

async function getConnect() {
    try {
        // If you're using an environment variable for the connection string
        // await mongoose.connect(process.env.DBKEY);

        // Corrected connection string without http:// and /Server
        // Replace 127.0.0.1 with your actual MongoDB server IP if needed
        await mongoose.connect("mongodb://127.0.0.1:27017/Server");

        console.log("Database is Connected!");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

getConnect();
