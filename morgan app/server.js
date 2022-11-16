const express = require('express')
const morgan = require('morgan')
const {v4:uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

const app = express()

const port =process.env.port || 9800

morgan.token('id',function getid(req){
    return req.id
})

morgan.token('param',function(req,res,param){
    return 'userToken'
})

app.use(assigner)

let accessLogStream = fs.createWriteStream(path.join(__dirname,"access.log") ,{flags:'a'})


app.use(morgan(':id: param :method :status :url "HTTP/:http-version'))
////////// set up logger
app.use(morgan(':id: param :method :status :url "HTTP/:http-version"', {stream : accessLogStream}))

function assigner(req,res,next){
    req.id = uuidv4()
    next()
}

app.get('/',(req,res)=>{
    res.end("Morgan Logger App")
})


app.listen(port,()=>{
    console.log(`Server is runing on http://localhost:${port}`);
})