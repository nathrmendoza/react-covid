import React from 'react'

const ResetTable = ({clickFunc}) => {
    return (
        <button type='button' id="show-all-res" onClick={ev=>clickFunc(ev)}>Show All Countires</button>
    )
}

export default ResetTable
