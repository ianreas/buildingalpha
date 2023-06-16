import React from 'react'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'




export default function TopMovers(){
    const [topMovers, setTopMovers] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
    async function fetchTopMovers(){
        const response = await fetch(`https://buildingalpha-new.herokuapp.com/getTopMovers`)
        let data = await response.json()
          console.log(data)
        setTopMovers(data)
        setLoading(false)
      }
      fetchTopMovers()
    }, [])
      

      

    return (
        
         <>
         {loading ? <Skeleton count={18}/> :
        <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
         
            <h1 style={{borderBottom: '2px solid black', width: "100%", textAlign: 'center'}}>Top Movers</h1>
            <ul style={{ listStyle: 'none', width: '80%' }}>
                {topMovers.map((topMover, index) => (
                    <li key={index} >
                        <div style={{marginBottom: '10px',border: "1px solid black"}}>
                            <p style={{marginLeft: '5px'}}>{topMover[1]}   -   <span style={{backgroundColor: 'lightGreen'}}>{topMover[0]}</span></p>
                        </div>
                        </li>
                    ))} 
            </ul>
    
        </div>
            }
        </>
    
    )
}