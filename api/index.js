const express = require("express")
const dotenv = require('dotenv')
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const app = express()
const PORT = process.env.PORT || 5000

dotenv.config();
app.use(express.json());

// const Users = [
//     {
//         id: 1,
//         name: "King"
//     },
//     {
//         id: 2,
//         name: "Bum"
//     },
// ]


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    
}


app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

app.listen(PORT, () => {
    console.log(`Sever is running on PORT ${PORT}`)
})