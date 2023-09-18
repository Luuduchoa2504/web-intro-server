require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')



const app = express()

app.use(express.json())
app.use(cors())

app.use(fileUpload({
    useTempFiles: true
}))

const userRouter = require('./routes/userRouter')
const emailRouter = require('./routes/emailRouter')
const ticketRouter = require('./routes/ticketRouter')

//Routes
app.use('/api', userRouter)
app.use('/api', emailRouter)
app.use('/api', ticketRouter)


// Connect to MongoDB
// const connectDB = async () => {
//     try {
//         await mongoose.connect(`mongodb://0.0.0.0:27017/ocb-core`,
//         {
//             // useCreateIndex: true,
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//             // useFindAndModify: false

//         })
//     console.log('MongoDB connected')

//     } catch (error) {
//         console.log("err" + error.message)
//         process.exit(1)
//     }
// }
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://0.0.0.0:27017/ocb`,
        {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false

        })
    console.log('MongoDB connected')

    } catch (error) {
        console.log("err" + error.message)
        process.exit(1)
    }
}
connectDB()

const PORT = 3000

app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`))
