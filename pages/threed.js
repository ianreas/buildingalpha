import {useState} from 'react'

export default function ThreeD(){
    const [ticker, setTicker] = useState("")
    const [data, setData] = useState([{}])

 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ticker) return

    async function fetchData() { const response = await fetch(`http://localhost:5000/acceptStockTicker?ticker=${ticker}`)
    const data = await response.json()
    setData(data)
  }
  fetchData()
 } 


  return (
    <div>
      
      <main>
        
        <div className='3dgraph'>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="form-label">Ticker</label>
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
          

      

            <div dangerouslySetInnerHTML={{__html: data.data}}>
      
            </div>
            </div>
            <div className=''>
                
            </div>
            
      </main>
   </div>
    
  )

}