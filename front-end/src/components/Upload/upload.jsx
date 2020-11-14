import React, {useState, useEffect} from 'react';
import Header from '../utils/Header/header.jsx';
import genreData from './genreData';
import Selector from '../utils/Filter/filter.jsx';
import './upload.css';
import Photo from '../../assets/images/foto.png';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

const Upload=()=>{
    const [formData,setFormData]= useState({
                                            "title":"",
                                            "sinopsis":"",
                                            "genres":[],
                                            "size":"",
                                            "downloadLink":"",
                                            "videoLink":""
    });
    const [onError,setOnError]= useState({
        'title':"errorFalse",
        "downloadLink":"errorFalse",
        "Selector-Plataforma":"errorFalse",
        "Selector-Idioma":'errorFalse',
        'size':"errorFalse",
    })
        const generos=genreData.genres;
        const lenguajes=genreData.languages;
        const platforms=genreData.platforms;

    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles)=>{
            const newState=formData;
            newState.image={
                file: acceptedFiles[0],
                preview: URL.createObjectURL(acceptedFiles[0])
            };
            setFormData({...newState});
        }
    })

    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        const id=e.target.id;
        const newState=formData;
        switch(name){
            case 'Selector':
                const theme=id.slice(id.indexOf('-')+1,id.length);
                if(newState[id]!=undefined && theme==value){
                    delete newState[id];
                }
                else {
                    newState[id]=value;
                    setOnError({...onError,[id]:'errorFalse'});

                }
                break;
            default:
                newState[name]=value;
                setOnError({...onError,[name]:'errorFalse'});
        }
        
        setFormData({...newState});
    }

    const handleGeneroClick=(e)=>{
        const value=e.target.value;
        const newState=formData;
        if(newState["genres"].includes(value)){
            newState['genres'].splice(newState['genres'].indexOf(value));
            e.target.className="";
        }
        else{
            newState["genres"].push(value);
            e.target.className="pressed";
        }
        setFormData({...newState});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //CHECK REQUIRED ENTRIES
        const required=Object.keys(onError);
        let validForm=true;
        let errorInputsName=[];
        for(let i=0;i<required.length;i++){
            if(formData[required[i]]==undefined || formData[required[i]]==""){
                validForm=false;
                errorInputsName.push(required[i]);
            }
        }
        if(validForm){
            const entryDate=new Date();
            const Form=new FormData();
            Form.append('title',formData.title);
            Form.append('sinopsis',formData.sinopsis);
            Form.append('platforms',formData['Selector-Plataforma']);
            Form.append('genre',formData.genres);
            Form.append('idioma',formData['Selector-Idioma'])
            Form.append('downloadLinks', formData.downloadLink);
            Form.append('entryDate',entryDate);
            Form.append('size',formData.size);
            Form.append('file',formData.image==undefined?null:formData.image.file);
            Form.append('video',formData.videoLink);
            const config={
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post('http://localhost:3000/json/upload',Form,config)
            .then(()=>{
                console.log('The game has been sent!');
                location.reload();
            }) 
        }
        else{
            const errors=Object.assign(onError);
            errorInputsName.map(name=>{
                errors[name]="errorTrue";
            });
            setOnError({...errors});
        }
    }

    const ImagePreview=(
        formData.image==undefined?
        <img src={Photo} className="photoIcon" alt="photoIcon"/>
        :
        <img src={formData.image.preview} className="photoPreview" alt="photoPreview"/>
    )
    
    return(
        <>
            <Header/>
            <div className="uploadWrapper">
                <div className="uploadGrid">
                    <div className="previewBlock" {...getRootProps()}>
                        <input {...getInputProps()}/>
                        {
                            isDragActive ?
                            <div className="previewBorder onHover">
                                {ImagePreview}
                            </div>
                            :
                            <div className="previewBorder">
                            {ImagePreview}
                            </div>
                        }
                        
                    </div>
                    <form onSubmit={handleSubmit} className="uploadContainer">
                        <div className="uploadItem title"><h1>Form</h1></div>
                            <div className="uploadItem">
                                <input onChange={handleInput} type="text" name="title"  value={formData.title} placeholder="Title" id="title"/>
                                <p className={`data-error ${onError.title}`}>Title is empty</p>
                                </div>
                            <div className="uploadItem input-title">
                                <textarea onChange={handleInput} name="sinopsis" value={formData.sinopsis} placeholder="sinopsis" id="sinopsis"></textarea>
                                </div>
                        <div className="uploadItem generos">
                            <div className="Generoscontainer">
                                {generos.map((genero,index)=>(
                                    <button type="button" key={`${genero}-${index}`} id={`${genero}-${index}`} value={genero} onClick={handleGeneroClick} className="">{genero}</button>
                                ))}
                            </div>
                        </div>
                        <div className="uploadItem uploadLanguage input-idioma">
                            <Selector onChange={handleInput} theme={"Idioma"} options={lenguajes} size={"normal"} />
                            <p className={`data-error ${onError['Selector-Idioma']}`}>Language not selected</p>
                        </div>
                        <div className="uploadItem uploadPlatform input-platform">
                            <Selector onChange={handleInput} theme={"Plataforma"} options={platforms} size={"normal"} />
                            <p className={`data-error ${onError['Selector-Plataforma']}`}>Platform not selected</p>
                        </div>
                        <div className="uploadItem input-size">
                            <input type="text" onChange={handleInput} value={formData.size} placeholder="file size (ex: 1.5 GB)" name="size" id="size"/>
                            <p className={`data-error ${onError.size}`}>file size empty</p>
                            </div>
                        <div className="uploadItem input-downloadLinks">
                            <input type="text" onChange={handleInput} value={formData.downloadLink} name="downloadLink" placeholder="download link (utorrent)" id="downloadLink"/>
                            <p className={`data-error ${onError.downloadLink}`}>downloadLink empty</p>
                            </div>
                        <div className="uploadItem input-video">
                            <input type="text" onChange={handleInput} value={formData.videoLink} name="videoLink" placeholder="youtube video URL" id="videoLink"/>
                            </div>
                        <div className="uploadItem"><button className="send" type="submit">Upload</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Upload;