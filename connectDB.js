import mongoose from "mongoose";

export default async function connectDB() {

    try {
        if (!mongoose.connection.readyState) {
            console.log(`uri is ${process.env.MONGO_URI}`)
            console.log(mongoose.connection.readyState)
            const mongo = await mongoose.connect(process.env.MONGO_URI)
            console.log(`DataBase connected :`)
            console.log(mongo)
        }
        else{
            console.log("connected: ", mongoose.connection.host)
        }

    } catch (error) {

        console.log(error)

    }

}