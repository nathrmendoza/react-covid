import React from 'react'

const TableItem = ({itemdata}) => {
    console.log(itemdata)
    if (typeof itemdata !== 'undefined') {
        return (
            <tr>
                <td>Philippines</td>
                <td>{itemdata.confirmed.value}</td>
                <td>{itemdata.confirmed.value}</td>
                <td>{itemdata.confirmed.value}</td>
            </tr>
        )
    }
}

export default TableItem
