const express=require('express');
const app=express();
const path=require('path');
const morgan=require('morgan');
const {mongoose}=require('./database');

//SETTINGS
app.set('port',process.env.PORT || 3000);
/* app.set('whiteList', ['http://localhost:8080/']);
app.set('corsOptions',{
    origin: (origin,callback)=>{
        if(app.get('whiteList').indexOf(origin)!=-1) callback(null,true);
        else callback("Not allowed by CORS policy");
    }
})
 */

 //MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
//app.use(cors(app.get('corsOptions')));

//ROUTES
app.use('/json',require('./routes/gameroutes'));

//STATIC FILES
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), ()=>{
    console.log(`the server is up on port ${app.get('port')}`);
})