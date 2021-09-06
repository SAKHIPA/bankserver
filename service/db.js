const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/remainderapp',
{
    useNewUrlParser:true
    //useUnifieldTopology:true
})

//model
const User=mongoose.model('User',
{
    userid:Number,
    uname:String,
    pw:Number,
    event:[]
})

module.exports={
    User
}