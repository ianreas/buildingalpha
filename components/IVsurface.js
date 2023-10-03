import {useState, useEffect} from 'react'
import {Waveform} from '@uiball/loaders'
//import Plot from 'react-plotly.js'
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export default function IVsurface(){
    const [twoDArray, setTwoDArray] = useState()
    const [ticker, setTicker] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData(){
            try {
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getNewThreeDGraph?ticker=TSLA`);
            const data = await response.json()
            setTwoDArray({type: 'surface', z: data});
            } catch (error){
                console.error("Error fetching", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, []) 



    const handleSubmit = (e) => {
        e.preventDefault()
        if (!ticker) return
        setIsLoading(true);
        
        async function fetchData() {
        try {
        const response = await fetch(`https://buildingalpha-new.herokuapp.com/getNewThreeDGraph?ticker=${ticker}`)
        const data = await response.json()
        setTwoDArray({type: 'surface', z: data})
        } catch (error){
            console.error("Error fetching, error");
        } finally {
            setIsLoading(false);
        }
      }
      fetchData();
    }

    return (
        <div className='iv-surface-component-wrapper'>
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
            defaultValue="TSLA"
            onChange={(e)=>setTicker(e.target.value)}
            required
            />
            {/* <input type='submit' value='Submit'/> */}
            <button className='arrowbuton' type='submit' value='Submit' style={{ outline: 'none', border: 'none', position: 'relative', background: 'transparent'}}>
                <img src='/buttonarrow.png' className='faviconbutton'/>
            </button><span style={{color: 'white', fontSize: '0.8rem', opacity: '80%'}}>(example: TSLA)</span>
            </form>
            </div>
            {isLoading ? <div style={{marginTop: "8vh", height: '370px'}}><Waveform size={70} color='white' /></div> :
            <div className='threed-plot-wrapper'>
             <Plot
            data = {[twoDArray]}
            layout={{ title: 'IV Surface',
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor:"rgba(0,0,0,0)",
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
            </div>}
        </div>
        </div>
    )
}