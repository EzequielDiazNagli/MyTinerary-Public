require("dotenv").config()
require("./config/config")

const express = require ('express')
const Router = require('./routes/routes')
const cors = require("cors")
const passport = require("passport")
const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/api', Router)

// app.set ('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVIDOR CREADO!')
})

app.listen(PORT,()=> console.log('Server ready on PORT ' + PORT))



// app.listen(PORT, () => {
//     console.log('SERVIDOR CORRIENDO EN PUERTO: ' + app.get ('port'))
// })




// require('dotenv').config()
// require('./config/database')
// const express = require('express')
// const Router = require('./routes/routes')
// const PORT = 4000

// const app = express()

// //middlewares
// app.use(express.json())
// app.use('/api', Router)


// app.listen(PORT,()=> console.log('Server ready on PORT ' + PORT))