import React from 'react'

const ResetTable = ({clickFunc, ifgeneral}) => {
    return (
        <button type='button' disabled={ifgeneral === "General" ? true : false} id="show-all-res" onClick={ev=>clickFunc(ev)}>Show All Countires</button>
    )
}

export default ResetTable
