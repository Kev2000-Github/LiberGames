const express=require('express');
const { title } = require('process');
const router=express.Router();
const Game=require('../models/games');
const multer=require('multer');
const upload=multer();
require('dotenv').config();
const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name: `${process.env.CLOUDNAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.SECRET_KEY}`
});

router.get('/',async (req, res)=>{
    const games=await Game.find();
    res.json({games});
})

router.get('/search/:title',async (req,res)=>{
    const games=await Game.find({title: {$regex: req.params.title,$options: 'i'}});
    console.log(req.body);
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

router.post('/upload',upload.single('file'),async (req,res)=>{
    const formData={...req.body, picture:''};
    if(req.file){
        const dataURI=req.file.buffer.toString('base64');
        const uploadSTR='data:image/jpeg;base64,'+ dataURI;    
        await cloudinary.uploader.upload(uploadSTR,(err,result)=>{
            if(err) console.log(err);
            else formData['picture']=result.secure_url;
        });
    }
    const newGame=new Game({...formData});
    await newGame.save().then(()=>{
        res.json({status:"The game has been added"});
    })
    .catch(()=>{
        console.log(err);
        res.json({status:'Error'});
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
        res.json({status: "the game has been updated successfully"})
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

router.get('/platforms', async (req,res)=>{
    const params=req.query;
    let filters={};
    let order=(params.order && params.order=='DES')? -1 : 1;
    const toPage= params.page || 1;
    const allFilters=Object.keys(params);
    const limit=parseInt(params.limit);
    const queries=['limit','page','order'];
    allFilters.map(key=>{
        if(key=="title") filters[key]={$regex: `^${params[key]}`, $options: 'i'}
        else if(!queries.includes(key)) filters[key]={$in: [params[key]]}
    });
    const games=await Game.paginate(filters,{limit, sort: {entryDate: order}, page: toPage})
    console.log(filters);
    res.json({...games});
})

module.exports=router;