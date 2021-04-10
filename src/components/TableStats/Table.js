import React from 'react'
import TableItem from './TableItem'
import Loading from '../Loading'
import './Table.css';

const Table = ({tabledata, currc, loading, pagenums, paginate}) => {
    let checker = tabledata instanceof Array;
    if(!loading) {
        return (
            
            <section id="table-result">
                <Loading />
            </section>
        )
    }
    else {
        //check if undefined
        if (tabledata !== undefined) {
            if(!checker) {
                return (
                    <section id="table-result">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Location</th>
                                    <th>Total Cases</th>
                                    <th>Active Cases</th>
                                    <th>Recovered</th>
                                    <th>Deaths</th>
                                </tr>
                                <tr>
                                    <td>{currc}</td>
                                    <td>{tabledata.confirmed.value}</td>
                                    <td>{tabledata.confirmed.value - tabledata.recovered.value - tabledata.deaths.value}</td>
                                    <td>{tabledata.recovered.value}</td>
                                    <td>{tabledata.deaths.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    
                )
            }
            else{
                return (
                    <section id="table-result">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Location</th>
                                    <th>Total Cases</th>
                                    <th>Active Cases</th>
                                    <th>Recovered</th>
                                    <th>Deaths</th>
                                </tr>
                                {tabledata.map((e,index)=><TableItem itemdata={e} key={index}/>)}
                            </tbody>
                        </table>
                    </section>
                )
            }
        }
        else {
            return <div>No Data</div>
        }

    }
}

export default Table
