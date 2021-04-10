import React from 'react'

const Pagination = (pagenums, paginate, loading) => {
    if (!loading) {
        return <div>loading</div>
    }else {
        if (typeof pagenums !== "undefined" && pagenums.length){
            return (
                <ul id="pagination">
                    {pagenums.map(number => 
                        <li key={number.value} id={number.value} className={number.state ? "active" : ""} onClick={ev=>{paginate(ev)}}>{number.value}</li>
                    )}
                </ul>
            )
        }
        else {
            return <></>
        }
    }
}

export default Pagination
