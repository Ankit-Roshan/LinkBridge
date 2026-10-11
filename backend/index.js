require("dotenv").config();
const express = require("express")

const app = express()
const connectDB = require("./config/db");

app.use(express.json())  

const PORT = 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Sun raha hai na tu ${PORT} ✅`);
    });
};

startServer();

const userRoutes = require("./router/userRoutes")
app.use("/users",userRoutes)