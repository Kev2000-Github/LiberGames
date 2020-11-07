const express=require('express');
const { title } = require('process');
const router=express.Router();
const Game=require('../models/games');
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.get('/',async (req, res)=>{
    const games=await Game.find();
    res.json({games});
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

router.get('/game/:id', async (req,res)=>{
        const game=await Game.findById(req.params.id);
        game==null?res.json({Error:'Game not found'}):res.json({game});
})

router.put('/game/:id', async (req,res)=>{
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

router.delete('/game/:id', async (req,res)=>{
    await Game.findByIdAndDelete(req.params.id).then(()=>{
        res.json({status:"the game has been deleted successfully"});
    })
    .catch(err=>{
        console.log(err);
        res.json({status: "No game found"});
    })
    
})

router.get('/platforms/:platform', async (req,res)=>{
    const games=await Game.find({platforms: {$in: req.params.platform}});
    games==null?res.json({status:'Error game not found'}):res.json({games});
})

module.exports=router;