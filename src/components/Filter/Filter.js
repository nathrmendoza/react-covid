import React, {useState} from 'react'
import './Filter.css'
import ResetButton from '../ResetTable';

const Filter = ({filterdata, dofilter, currval, resetfunc}) => {
    const [val, setval] = useState(currval);
    
    const passToApp = (e) => {
        e.preventDefault();
        resetfunc(e);
    }

    return (
        <section id="filters">
            <div className="filter-container">
                
                <select id="select-country" value={currval === "General" ? "General" : val} onChange={ev=>{dofilter(ev.target.value); setval(ev.target.value); console.log(currval)}}>
                    <option value="General">General</option>
                    {filterdata.map((e, index) => <option value={e.name} key={index}>{e.name}</option>)}
                </select>
                <ResetButton clickFunc={passToApp} ifgeneral={currval}/>
                
                {/* <div className="search-bar">
                    <input type='text' id="searchbar"/>
                    <input type='submit' id="submit-search"/>
                </div> */}
            </div>
        </section>
    )
}

export default Filter
