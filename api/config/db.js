const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connected successfully");
    }
    catch(err){
        console.log(err);
    }
    

}

module.exports = dbConnect;