const mongoose= require('mongoose')

module.exports = connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        })

        console.log(` MongoDB Connected : ${conn.connection.host}`)
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

