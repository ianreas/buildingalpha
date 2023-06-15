import {useState, useEffect} from 'react'
//import Plot from 'react-plotly.js'
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export default function NewThreeD(){
    const [twoDArray, setTwoDArray] = useState()
    const [ticker, setTicker] = useState()

    /* useEffect(() => {
        async function fetchData(){
            const response = await fetch(`http://localhost:5000/getNewThreeDGraph?ticker=${ticker}`);
            const data = await response.json()
            console.log(data)
            //let surfaceData = JSON.parse(data)
            setTwoDArray({type: 'surface', z: data})
        }
        fetchData()
    }, []) */

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!ticker) return
    
        async function fetchData() { const response = await fetch(`https://buildingalpha-new.herokuapp.com/getNewThreeDGraph?ticker=${ticker}`)
        const data = await response.json()
        setTwoDArray({type: 'surface', z: data})
      }
      fetchData()
     } 

    return (
        <div className='threed-component-wrapper'>
        <div className='threed-component-text'>
            <h1>Plot Ticker's IV Surface.</h1>
            <p>The volatility surface is a three-dimensional plot showing the implied
            <br></br>volatilities of a stock's options that are listed on it across different strike prices
            <br></br>and expirations.
            </p>
        </div>
        <div className='threed-searchplot-wrapper'>
            <div className='threed-search'>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="form-label">Ticker: </label>
            <input 
            type="text"
            className="form-control" 
            placeholder ="Enter stock ticker"
            value={ticker}
            onChange={(e)=>setTicker(e.target.value)}
            required
            />
            <input type='submit' value='Submit'/>
            </form>
            </div>
            <div className='threed-plot-wrapper'>
             <Plot
            data = {[twoDArray]}
            layout={{ title: 'IV Surface',
            scene: {
                legend: {
                    orientation: 'h', 
                    x: 0.5, 
                    y: 1.1
                },
                xaxis: {title: "Strike Price"},
                yaxis: {title: "Weeks Until Expiration"},
                zaxis: {title:"Implied Volatility"}
            },
            autosize: true,
            
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4}}}
            />
            </div>
        </div>
        </div>
    )
}