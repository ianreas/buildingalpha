import { useState } from 'react'

import { useEffect } from 'react'
export default function WSBMentions(){
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchWSB(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/wsbMentions`)
            let data = await response.json()
              console.log(data)
            setData(data?.results?.slice(0, 6))
        }
        fetchWSB()
    }, [])  

    return (
        <div className='carousel-mentions'>

            <h1>Mentions of Stocks on popular discussion forums</h1>
            <table id='carousel-mentions-table'>
                <thead>
                    <tr className='wsb-table-head-tr'>
                        <th>Ticker</th>
                        <th>Mentions</th>
                        <th>Name</th>
                        <th>Rank 24h ago</th>
                    </tr>
                </thead>
                <tbody className='wsb-mentions-tbody'>
                    { data?.map((result, index) => (
                        <tr key={index}>
                            <td id="wsb-td-stockname">{result.ticker}</td>
                            <td>{result.mentions}</td>
                            <td>{result.name}</td>
                            <td>{result.rank_24h_ago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}