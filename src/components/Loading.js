import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

const Loading = () => {
    return (

        <div className="loading-wrap">
            <div className="loading-wrap"><PulseLoader color={'#55C6E6'} size={15} margin={6}/></div>
        </div>
    )
}

export default Loading
