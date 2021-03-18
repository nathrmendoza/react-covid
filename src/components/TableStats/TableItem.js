import React from 'react'

const TableItem = ({itemdata}) => {
    //sometimes data returns undefined
    if (typeof itemdata !== 'undefined') {
        return (
            <tr>
                <td>Philippines</td>
                <td>{itemdata.confirmed.value}</td>
                <td>{itemdata.confirmed.value - itemdata.recovered.value - itemdata.deaths.value}</td>
                <td>{itemdata.recovered.value}</td>
                <td>{itemdata.deaths.value}</td>
            </tr>
        )
    }
    //if undefined return nothing
    else {
        console.log(itemdata);
        return (<></>)
    }
}

export default TableItem
