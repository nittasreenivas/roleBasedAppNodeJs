
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv/config') 
var bodyParser = require('body-parser') 
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

app.get('/',(req,res) => {
    res.send('hii welcome to home page')
})

mongoose.connect(process.env.DB_CONNECTION)
.then(() => {
    console.log(`Database connected sucessfully`)
})
.catch((err) => {
    console.log(`Database got some error ${err}`)
})

const port = process.env.PORT_NO 

app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})