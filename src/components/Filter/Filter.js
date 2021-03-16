import React, {useState} from 'react'
import './Filter.css'

const Filter = ({filterdata, dofilter, currval}) => {
    const [val, setval] = useState(currval);

    return (
        <div className="filter-container">
            
            <select id="select-country" value={val} onChange={ev=>{dofilter(ev.target.value)}}>
                <option>General</option>
                {filterdata.map((e, index) => <option value={e.name} key={index}>{e.name}</option>)}
            </select>

            {/* <div className="search-bar">
                <input type='text' id="searchbar"/>
                <input type='submit' id="submit-search"/>
            </div> */}
        </div>
    )
}

export default Filter
