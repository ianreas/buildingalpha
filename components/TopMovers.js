import React from 'react'
import { useEffect, useState } from 'react'


export default function TopMovers(){
    const [topMovers, setTopMovers] = useState([])

    useEffect(() => {
    async function fetchTopMovers(){
        const response = await fetch(`http://127.0.0.1:5000/getTopMovers`)
        let data = await response.json()
          console.log(data)
        setTopMovers(data)
      }
      fetchTopMovers()
    }, [])
      

      

    return (
        <div>
            <h1>Top Movers</h1>
            <ul>
                {topMovers.map((topMover, index) => (
                    <li key={index}> {topMover[1]} - {topMover[0]}</li>
                    ))}
            </ul>
        </div>
    )
}