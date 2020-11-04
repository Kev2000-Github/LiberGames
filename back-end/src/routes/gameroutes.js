const express=require('express');
const { title } = require('process');
const router=express.Router();
const Game=require('../models/games');
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.get('/',async (req, res)=>{
    const games=await Game.find();
    res.json(games);
})

router.post('/', async (req,res)=>{
    const data=req.body;
    const newGame=new Game({...data});
    await newGame.save().then(()=>{
        res.json({status: 'the game has been added'})
    })
    .catch(err=>{
        console.log(err)
        res.json({status:"Error"})
    })
})

router.get('/:id', async (req,res)=>{
    const game=await Game.findById(req.params.id).then(()=>{
        res.json({game});
    })
    .catch(err=>{
        console.log(err);
        res.json({status:"Error, Game not found"})
    })
})

router.put('/:id', async (req,res)=>{
    const data=req.body;
    await Game.findByIdAndUpdate(req.params.id,{...data},{useFindAndModify:false})
    .then(()=>{
        res.json({status: "the game has been updates successfully"})
    })
    .catch(err=>{
        console.log(err);
        res.json({status:"Error"})
    })
})

router.delete('/:id', async (req,res)=>{
    await Game.findByIdAndDelete(req.params.id).then(()=>{
        res.json({status:"the game has been deleted successfully"});
    })
    .catch(err=>{
        console.log(err);
        res.json({status: "No game found"});
    })
    
})

module.exports=router;