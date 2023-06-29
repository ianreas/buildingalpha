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
            <h1>Plot Ticker&apos; IV Surface.</h1>
            <p>The volatility surface is a three-dimensional plot showing the implied
            <br></br>volatilities of a stock&apos;s options that are listed on it across different strike prices
            <br></br>and expirations.
            </p>
        </div>
        <div className='threed-searchplot-wrapper'>
            <div className='threed-search'>
            <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center'}}>
            <label htmlFor="title" className="form-label" style={{color: "#D3D3D3", marginRight: '0.5rem'}}>Ticker:  </label>
            <input 
            type="text"
            className="form-control" 
            placeholder ="Enter stock ticker"
            value={ticker}
            onChange={(e)=>setTicker(e.target.value)}
            required
            />
            {/* <input type='submit' value='Submit'/> */}
            <button className='arrowbuton' type='submit' value='Submit' style={{backgroundColor: "#1a1e26", outline: 'none', border: 'none', position: 'relative'}}>
                <img src='/buttonarrow.png' className='faviconbutton'/>
            </button>
            </form>
            </div>
            <div className='threed-plot-wrapper'>
             <Plot
            data = {[twoDArray]}
            layout={{ title: 'IV Surface',
            plot_bgcolor: '#1a1e26',
            paper_bgcolor:"#1a1e26",
            font: {
                color: "white"
            },
            coloraxis: {
                colorbar: {
                    bordercolor: "#6e889f",
                    outlinecolor: "#6e889f",
                    tickcolor: "#6e889f",
                    tickfont: {
                        color: "#6e889f"
                    },
                    title: {
                        font: {
                            color: "#6e889f"
                        }
                    }
                }
            },
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