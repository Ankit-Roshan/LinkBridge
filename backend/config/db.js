require("dotenv").config();

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("✅ MongoDB Connecte ho gaya");

    } catch (error) {
        console.log("❌ MongoDB Connection Error");
        console.log(error.message)
    }
}

module.exports = connectDB
