const { connect } = require("mongoose");
require("dotenv").config()
const dbConnect= async ()=>{
    try {
        if (process.env.NODE_ENV === "local"){
            await connect(process.env.LOCAL_DB_URL)
            console.log("local database connected");
        }else{
            await connect(process.env.MONGODB_URL)
            console.log("production database connected");
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports=dbConnect