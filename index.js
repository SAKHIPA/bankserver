const express=require('express')
const session=require('express-session')
const cors=require('cors')
const dataservice=require('./service/dataservice')
const app=express()


app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.use(session({
    secret: 'randomsecuretstring',
    resave: false,
    saveUninitialized: false
}))

const authenticateMiddleware=(req,res,next)=>{
    
  if (!req.session.currentid) {
    res.json( {

      statuscode: 422,
      status: false,
      message: "please login.."
    })
  }
else{
    next()
}
}

app.use(express.json())



app.post('/register', (req, res) => {
    console.log(req.body)
    dataservice.register(req.body.userid, req.body.uname, req.body.pw).then(result=>{
        res.status(result.statuscode).json(result)

    })

})
app.post('/login', (req, res) => {
    console.log(req.body)
     dataservice.login(req,req.body.userid, req.body.pw).then(result=>{
        res.status(result.statuscode).json(result)

    })

})
app.post('/addEvent', authenticateMiddleware,(req, res) => {
    console.log(req.body)
    dataservice.addEvent(req,req.body.userid, req.body.event,req.body.date).then(result=>{
        res.status(result.statuscode).json(result)

    })

})

app.post('/listEvent', authenticateMiddleware, (req, res) => {
     dataservice.listEvent(req.body.userid).then(result=>{
        res.status(result.statuscode).json(result)

     })

    })


app.listen(3000,()=>{
    console.log("server started:3000");
})