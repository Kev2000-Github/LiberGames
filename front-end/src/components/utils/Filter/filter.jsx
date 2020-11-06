import React from 'react';
import './filter.css';

const Filter=(props)=>{
    const size=props.size;
    const theme=props.theme;
    const options=props.options;
    return(
        <>
        <select name={`selector-${theme}`} className={"selector " + size}>
                <option defaultValue={theme}>{theme}</option>
                {options.map((option,index)=>{
                    return (<option key={`${theme}-${index}${option}`} value={option}>{option}</option>)
                })}
        </select>
        </>
    )
}

export default Filter;