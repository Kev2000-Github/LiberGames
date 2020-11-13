import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './pageNumeration.css'
import LeftArrow from '../../../assets/images/left-arrow.png';
import RightArrow from '../../../assets/images/right-arrow.png';

const PageNumeration=({pageCount, path, currentPage})=>{
    const [pages, setPages] = useState(Array.from(Array(pageCount)).map((e,i)=>i+1));
    useEffect(()=>{
        setPages(Array.from(Array(pageCount)).map((e,i)=>i+1))
    },[pageCount]);

    return(
        <div className="pageNumeration">
            <ul className="numerationList">
                <li className={currentPage==1?"cursorNone":""}>
                    <Link to={`${path}page=${currentPage-1}`}>
                        <span>
                            <img src={LeftArrow} alt=""/>
                        </span>
                    </Link>
                </li>
                {pages.map((page)=>(
                    <li className={page==currentPage?"currentPage":""} key={`key-${page}`}><Link to={`${path}page=${page}`}><span>{page}</span></Link></li>
                ))}
                <li className={currentPage==pageCount?"cursorNone":""}>
                    <Link to={`${path}page=${currentPage+1}`}>
                        <span>
                            <img src={RightArrow} alt=""/>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default PageNumeration;

