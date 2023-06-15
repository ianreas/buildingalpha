import {useState, useEffect} from 'react'

export default function TickerDetails(ticker){
    const [details, setDetails] = useState();

    useEffect(() => {
        async function fetchDetails(){
            if (ticker.ticker){
            const theTicker = ticker.ticker;
            const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${theTicker}?apiKey=pU6tlWsINVBMDXlMQNpqnFS1VOMiys0e`)
            const data = await response.json();
            setDetails(data);
            console.log(data);
            }
        }
        fetchDetails();
    }, [ticker])

    return (
        <div>
            <h1>{details?.results?.name}</h1>
            <h3>{details?.results?.description}</h3>
            <h3>Number of Employees: {details?.results?.total_employees}</h3>
        </div>
    )
}