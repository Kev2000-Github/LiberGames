const mongoose=require('mongoose');
const {Schema}=mongoose;

const Game=new Schema({
    title: {type: String,required: true},
    entryDate: {type: Date,required: true},
    
});

module.exports=mongoose.model('Game',Game);