import {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SectorPerformance(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSectorPerformance(){
            const response = await fetch('https://buildingalpha-new.herokuapp.com/getSectorPerformance')
            const data = await response.json()
            console.log(data)
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
            <table>
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Daily Performance Change</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((result, index) => (
                        <tr key={index}>
                            <td>{result[0]}</td>
                            <td>{result[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        }
        </>
    )

}