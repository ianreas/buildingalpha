import {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SectorPerformance(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSectorPerformance(){
            const response = await fetch('https://buildingalpha-new.herokuapp.com/getSectorPerformanceFromDB')
            const data = await response.json()
            //console.log(data)
            setData(data)
            setLoading(false)
            
        }
        //add the function here
        fetchSectorPerformance()
    },  [])

    return(
        <>
        {loading ? <Skeleton count={18}/> :
        <div className='sector-performance'>
            <h1>Sector Performance</h1>
            <table className='sector-performance-table'>
                <thead>
                    <tr className='sector-performance-head-tr'>
                        <th>Sector</th>
                        <th>Daily Performance Change</th>
                    </tr>
                </thead>
                <tbody className='sector-performance-tbody'>
                    {data?.map((result, index) => {
                        const numericValue = parseFloat(result[1]);
                        const color = numericValue > 0 ? '#57d7ba' : 'red';

                        return (
                        <tr key={index}>
                            <td style={{textAlign: 'center'}}>{result[0]}</td>
                            <td style={{textAlign: 'center', color: color}}>{result[1]}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        }
        </>
    )

}