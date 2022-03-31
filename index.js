require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require("cookie-session")

const sequelize = require('./util/database')
const userRoutes = require('./routes/userAuthRoutes')
const addressRoutes = require('./routes/addressRoutes')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    cookieSession({
        name: "my-session",
        secret: "COOKIE_SECRET",
        httpOnly: true,
        sameSite: 'strict'
    })
)

app.use(userRoutes)
app.use('/address', addressRoutes)


// sequelize.sync({force: true})
sequelize.sync()

app.get("/", (req, res) => {
    res.json({ message: "Login/Signup" })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})


