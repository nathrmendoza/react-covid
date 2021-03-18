import React from 'react'
import './TotalStats.css'
import {FaGlobeAsia} from 'react-icons/fa'
import Loading from '../Loading'

const TotalStats = ({totaldata, loading}) => {
    //when still loading show this
    if (!loading) {
        return (
            <section id="total-stats">
                <div className="top"><FaGlobeAsia/><h2>Worldwide Stats</h2></div>
                <Loading/>
            </section>
        )
    }
    //else show this
    else {
        return (
            <section id="total-stats">
                <div className="top"><FaGlobeAsia/><h2><span className="color-b">Worldwide</span> Stats</h2></div>
                <div className="container">
                    <div id="t-confirmed">
                        <div className="wrap">
                        <p>Total Cases
                            <span className="value">{totaldata.confirmed.value}</span>
                        </p>
                        </div>
                    </div>
                    <div id="t-active">
                        <div className="wrap">
                            <p>
                                Confirmed Cases
                                <span className="value">{totaldata.confirmed.value - totaldata.recovered.value - totaldata.deaths.value}</span>
                            </p>
                        </div>
                    </div>
                    <div id="t-recovered">
                        <div className="wrap">
                            <p>
                                Recovered
                                <span className="value">{totaldata.recovered.value}</span>
                            </p>
                        </div>
                    </div>
                    <div id="t-deaths">
                        <div className="wrap">
                            <p>
                                Deaths
                                <span className="value">{totaldata.deaths.value}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default TotalStats
