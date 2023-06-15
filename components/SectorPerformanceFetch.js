import {useState, useEffect} from 'react'

export default function SectorPerformanceFetch(){
    const [performanceData, setPerformanceData] = useState()

    useEffect(() => {
        async function fetchSector(){
            const response = await fetch(`https://financialmodelingprep.com:443/api/v3/stock/sector-performance?apikey=a52eb4875d93cc912a4598736d5f57c4`)
            const data = await response.json()
            console.log(data)

        }
        fetchSector()
    }, [])


    return (
        <div>

        </div>
    )
}