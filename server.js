require('./config/config') // configuration

const express = require("express")
const bodyParser = require('body-parser')
const { orgRouter } = require('./router/orgRouter')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/organisations', orgRouter)

app.get('/', (req, res) => { res.send("Hello World.") })

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message,
        errors: error.data
    });
});


// server listener
app.listen(port, () => { console.log('Server is listening on ', port) })
