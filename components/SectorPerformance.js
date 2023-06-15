import {useState, useEffect} from 'react'

export default function SectorPerformance(){
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchSectorPerformance(){
            const response = await fetch('https://buildingalpha-new.herokuapp.com/getSectorPerformance')
            const data = await response.json()
            console.log(data)
            setData(data)
            
        }
        //add the function here
        fetchSectorPerformance()
    },  [])

    return(
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
    )

}