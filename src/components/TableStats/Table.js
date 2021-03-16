import React from 'react'
import TableItem from './TableItem'

const Table = ({tabledata, currc}) => {
    let checker = tabledata instanceof Array;

    if(!checker) {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Location</th>
                        <th>Cases</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                    <tr>
                        <td>{currc}</td>
                        <td>{tabledata.confirmed.value}</td>
                        <td>{tabledata.recovered.value}</td>
                        <td>{tabledata.deaths.value}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    else{
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Location</th>
                        <th>Cases</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                    {tabledata.map(e=><TableItem itemdata={e}/>)}
                </tbody>
            </table>
        )
    }
}

export default Table
