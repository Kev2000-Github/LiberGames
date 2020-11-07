import React from 'react'
import './pageNumeration.css'
import LeftArrow from '../../../assets/images/left-arrow.png';
import RightArrow from '../../../assets/images/right-arrow.png';

const PageNumeration=()=>{
    return(
        <div className="pageNumeration">
            <ul className="numerationList">
                <li><img src={LeftArrow} alt=""/></li>
                <li><a href="">1</a></li>
                <li><a href="">2</a></li>
                <li><a href="">3</a></li>
                <li><a href="">4</a></li>
                <li><a href="">5</a></li>
                <li><img src={RightArrow} alt=""/></li>
            </ul>
        </div>
    )
}

export default PageNumeration;

