import { useState } from 'react'

import { useEffect } from 'react'
export default function WSBMentions(){
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchWSB(){
            const response = await fetch(`http://127.0.0.1:5000/wsbMentions`)
            let data = await response.json()
              console.log(data)
            setData(data?.results?.slice(0, 6))
        }
        fetchWSB()
    }, [])  

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Mentions</th>
                        <th>Name</th>
                        <th>Rank 24h ago</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.map((result, index) => (
                        <tr key={index}>
                            <td>{result.ticker}</td>
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