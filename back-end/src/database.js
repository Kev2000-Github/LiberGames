const mongoose=require('mongoose');

const URI="mongodb://localhost/pirateGames";

mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('the database is up and working'))
.catch(err=>console.log(err));

module.exports=mongoose;