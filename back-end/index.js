const express=require('express');
const app=express();
const path=require('path');
const morgan=require('morgan');

//SETTINGS
app.set('port',process.env.PORT || 3000);

//MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

//STATIC FILES
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'),()=>{
    console.log(`the server is up on port ${app.get('port')}`);
})