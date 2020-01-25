const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const keys = require('./keys/index')
const fileRoute = path.join(__dirname, 'public')

app.use(express.static(fileRoute))
app.use(graphqlHTTP({schema, rootValue: resolver}))

app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {res.sendFile('/index.html')})

async function start(){
    try {
        await mongoose.connect(keys.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(keys.PORT, () => console.log('Сервер запущен'))
    } catch(e) {
        console.log(e)
    }
}
start()