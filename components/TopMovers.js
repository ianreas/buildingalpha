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
        <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center', backgroundColor: '#1a1e26'}}>
         
            <h1 style={{borderBottom: '1px solid #57d7ba', width: "100%", textAlign: 'center', color: '#e1e1e1'}}>Top Movers</h1>
            <div style={{display: 'flex', width: '100%' }}>
            <ul style={{ listStyle: 'none', width: '80%' }}>
                {topMovers.map((topMover, index) => (
                    <li key={index} style={{backgroundColor: '#202630'}}>
                        <div style={{marginBottom: '10px', padding: '10px'}}>
                            <p style={{marginLeft: '5px', color: "rgb(225, 225, 225)",  display: 'flex', justifyContent: "space-between"}}>{topMover[1]}     <span style={{color: '#57d7ba'}}>{topMover[0]}</span></p>
                        </div>
                        </li>
                    ))} 
            </ul>
            </div>
    
        </div>
            }
        </>
    
    )
}