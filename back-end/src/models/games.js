const mongoose=require('mongoose');
const {Schema}=mongoose;

const Game=new Schema({
    title: {type: String,required: true},
    entryDate: {type: Date,required: true},
    platforms: {type: [String],required: true},
    size: {type: String,required: true},
    genre: {type: String,required: false},
    sinopsis: {type: String,required: false},
    picture: {type: String,required: false},
    downloadLinks: {type: [String], required: true},
});

module.exports=mongoose.model('Game',Game);