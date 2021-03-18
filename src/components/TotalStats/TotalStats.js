import React from 'react'

const TotalStats = ({totaldata, loading}) => {
    //when still loading show this
    if (!loading) {
        return (<div>Loading Values...</div>)
    }
    //else show this
    else {
        return (
            <section id="total-stats">
                <div className="container">
                    <div id="t-confirmed">
                        <span className="value">{totaldata.confirmed.value}</span>
                    </div>
                    <div id="t-active">
                        <span className="value">{totaldata.confirmed.value - totaldata.recovered.value - totaldata.deaths.value}</span>
                    </div>
                    <div id="t-recovered">
                        <span className="value">{totaldata.recovered.value}</span>
                    </div>
                    <div id="t-deaths">
                        <span className="value">{totaldata.deaths.value}</span>
                    </div>
                </div>
            </section>
        )
    }
}

export default TotalStats
