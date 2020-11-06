import React from 'react'
import './pageNumeration.css'

const PageNumeration=()=>{
    return(
        <div className="numeration">
            <ul className="list">
                <li><img src="left-arrow.png" alt=""/></li>
                <li><a href="">1</a></li>
                <li><a href="">2</a></li>
                <li><a href="">3</a></li>
                <li><a href="">4</a></li>
                <li><a href="">5</a></li>
                <li><img src="right-arrow.png" alt=""/></li>
            </ul>
        </div>
    )
}

export default PageNumeration;

