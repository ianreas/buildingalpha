import { useEffect, useState } from "react"

export default function CongressTraders(){
    const [congressTraders, setCongressTraders] = useState()

    useEffect(() => {
        try {
        async function fetchCongressTraders(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getCongressTraders`)
            let data = await response.json()
            //console.log(data)
            
            setCongressTraders(data)

          }
          fetchCongressTraders()
          } catch (error) {
            console.log(error)
          }}
    , [])

    return (<div className='carousel-congress'>
        <h1 style={{borderBottom: '1px solid #57d7ba', width: "100%", textAlign: 'center', color: "#d7d7d7"}}>Congress Traders</h1>
        {congressTraders!==undefined ? 
                     <table className='congress-trading-table'>
                        <thead>
                            <tr className='congress-trading-table-head-tr'>
                                <th>Stock</th>
                                <th>Politican</th>
                                <th>Type/Amount</th>
                                <th>Disclosed</th>
                            </tr>
                        </thead>
                        <tbody className='congress-trading-tbody'>
                            <tr>
                                <td id='congress-trading-td-stockname'>
                                {congressTraders[0][0]}
                                </td>
                                <td>
                                    {congressTraders[0][1]} ({congressTraders[0][2]})
                                </td>
                                <td>
                                    {congressTraders[0][3]} ({congressTraders[0][4]})
                                 
                                </td>
                                <td>
                                    {congressTraders[0][5]} ({congressTraders[0][6]})
                                </td>

                                
                            </tr>
                            <tr>
                            <td id='congress-trading-td-stockname'>
                                {congressTraders[1][0]}
                                </td>
                                <td>
                                    {congressTraders[1][1]} ({congressTraders[1][2]})
                                </td>
                                <td>
                                    {congressTraders[1][3]} ({congressTraders[1][4]})
                                 
                                </td>
                                <td>
                                    {congressTraders[1][5]} ({congressTraders[1][6]})
                                </td>
                            </tr>
                            <tr>
                            <td id='congress-trading-td-stockname'>
                                {congressTraders[2][0]}
                                </td>
                                <td>
                                    {congressTraders[2][1]} ({congressTraders[2][2]})
                                </td>
                                <td>
                                    {congressTraders[2][3]} ({congressTraders[2][4]})
                                 
                                </td>
                                <td>
                                    {congressTraders[2][5]} ({congressTraders[2][6]})
                                </td>

                            </tr>
                            <tr>
                            <td id='congress-trading-td-stockname'>
                                {congressTraders[3][0]}
                                </td>
                                <td>
                                    {congressTraders[3][1]} ({congressTraders[3][2]})
                                </td>
                                <td>
                                    {congressTraders[3][3]} ({congressTraders[3][4]})
                                 
                                </td>
                                <td>
                                    {congressTraders[3][5]} ({congressTraders[3][6]})
                                </td>

                            </tr>
                            
                        </tbody>
                    </table>
                 : <div>Loading...</div>}</div>)
}