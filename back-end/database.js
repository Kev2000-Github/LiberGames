const mongoose=require('mongoose');

const URI="mongodb://localhost/pirateGames";

mongoose.connect(URI)
.then(()=>console.log('the database is up and working'))
.catch(err=>console.log(err));

module.exports=mongoose;