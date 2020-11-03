const express=require('express');
const { title } = require('process');
const router=express.Router();
const Game=require('../models/games');

router.get('/', async (req, res)=>{
    const games=await Game.find();
    res.json(games);
})

router.post('/', async (req,res)=>{
    const data=req.body;
    const newGame=new Game({...data});
    await newGame.save();
    res.json({status: 'the game has been added'})
})

router.get('/:id', async (req,res)=>{
    const game=await Game.findById(req.params.id);
    res.json({game});
})

router.put('/:id', async (req,res)=>{
    const data=req.body;
    await Game.findByIdAndUpdate(req.params.id,{...data},{useFindAndModify:false});
    res.json({status: "the game has been updates successfully"})
})

router.delete('/:id', async (req,res)=>{
    await Game.findByIdAndDelete(req.params.id);
    res.json({status:"the game has been deleted successfully"});
})

module.exports=router;