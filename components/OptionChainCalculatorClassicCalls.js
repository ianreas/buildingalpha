import {useState, useEffect} from 'react'

//LOGIC:
//FETCH THE STOCK PRICE
//ASK THE USER FOR A TICKER
//GIVE THE USER THE EXPIRATION DATES
//USER CLICKS ON A DATE => WE GIVE THEM STRIKE PRICES FOR THAT DATE
//USER CHOOSES A STRIKE PRICE => WE GIVE THEM AN OPTION MATRIX


export default function OptionChainCalculatorClassicCalls(){
    const [tickerPrice, setTickerPrice] = useState();
    const [optionsChainData, setOptionsChainData] = useState();

    const [selectedOptionPrice, setSelectedOptionPrice] = useState('')

    const [optionDates, setOptionDates] = useState()

    const [dateArrayIndex, setDateArrayIndex] = useState('')

    const [strike, setStrike] = useState()

    const [optionVolatility, setOptionVolatility] = useState()

    const [contractSymnol, setContractSymbol] = useState()

    const [optionsMatrix, setOptionsMatrix] = useState()

    const [ticker, setTicker] = useState('');

    const handlePriceCellClick = () => {

    }

    const handleChange = (event) => {
        setTicker(event.target.value.toUpperCase());
    };

    const handleTickerSubmit = (event) => {
        event.preventDefault();
    
        if (!ticker) return;
    
        async function fetchStockPrice(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getTheCurrentPrice?ticker=${ticker}`)
            const data = await response.json();
            console.log(data);
            setTickerPrice(data[ticker]['regularMarketPrice']);
        }
        fetchStockPrice();
    
        async function fetchDates(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionChainDates?ticker=${ticker}`)
            const data = await response.json()
            console.log(data)
            setOptionDates(data.dates)
        }
        fetchDates()
    
    
        //setTicker('')
        }

    const handleCellClick = (price, strike, volatility, symbol) => { //fetches the optionsmatrix 
        setSelectedOptionPrice(price)

        async function fetchOptionsMatrix(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionsPriceMatrix?price=${price}&symbol=${symbol}&strike=${strike}&volatility=${volatility}&stockPrice=${tickerPrice}&type=call`)
            const data = await response.json()
            console.log(data)
            setOptionsMatrix(data)
        }
        fetchOptionsMatrix()

    }

    const handleDateClick = (index) => {
        setDateArrayIndex(index)
        console.log(index)

        if (!ticker) return;
        
    }

    useEffect(()=> { //fetches the table of strike prices
        if (dateArrayIndex)
        { 
        async function fetchData() { const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionsChainData?ticker=${ticker}&index=${dateArrayIndex}&type=call`)
        const data = await response.json();
        console.log(data);
        setOptionsChainData(data);
        }
        fetchData();
        }
    }, [dateArrayIndex])

    function getCellClassName(cell){
        if (cell / selectedOptionPrice === 0){
            return 'dark-red'
        }
        if (cell / selectedOptionPrice > 0 && cell / selectedOptionPrice < 0.5){
            return 'medium-red'
        }

        if (cell/ selectedOptionPrice >= 0.5 && cell / selectedOptionPrice < 1){
            return 'light-red'
        }
        if (cell / selectedOptionPrice >= 1 && cell / selectedOptionPrice < 1.25){
            return 'light-green'
        }
        if (cell / selectedOptionPrice >= 1.25){
            return 'green'
        }

    }

    const renderTableHeaders = () => { //header of dates
        return (
            <tr>
                {optionsMatrix[1].map((date, index) => (
                    <th key={index}>{date[0]}</th>
                ))}
                <th>Possible Stock Prices</th>
            </tr>
        )
    }

    const showPriceAnalysis = (price) => {
        return (
            <div>
            {price ? <div>
                Meow
               <form>

                </form> 
            </div> : null}
            </div>
        )
    } 

    const [showAnalysis, setShowAnalysis] = useState(false)


    const renderTableRows = () => {
        return optionsMatrix[0].map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                    <td key={columnIndex} className={getCellClassName(cell)} onClick={() => setShowAnalysis(true)}>${cell}<button className='price-cell-button' onClick={() => showPriceAnalysis()}style={{backgroundColor: 'transparent', border: 'none'}}><p style={{margin: "0%", fontSize: '0.8rem'}}>Profit/Loss: ${roundToHundredth((cell-selectedOptionPrice)*100)}/option</p></button></td>
                ))}
                <td>${optionsMatrix[2][rowIndex]}</td>
            </tr>
        ))
        
      };

      function roundToHundredth(number) {
        return Math.round(number * 100) / 100;
      }




        

    
    return (<div className='classic-calls-wrap'> 
            <h1>Long Call Strategy</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'block'}}>
            <form onSubmit={handleTickerSubmit} style={{display: 'flex', alignItems: 'center'}}>
                    <label>
                        Select Ticker
                        <input type='text' value={ticker} onChange={handleChange} style={{marginLeft: '0.5rem'}}/>
                    </label>
                    <button className='arrowbuton' type='submit' value='Submit' style={{backgroundColor: "#1a1e26", outline: 'none', border: 'none', position: 'relative', top: '2px'}}>
                <img src='/buttonarrow.png' classNAme='faviconbutton'/>
            </button>
                    {/* <input type='submit' value='Submit' /> */}
                </form>
                </div>
        { tickerPrice ? <p>Ticker Price: {tickerPrice}</p> : null}
        
                
                {optionDates ? <><h2 style={{textAlign: 'center'}}>Choose The Expiration Date</h2><ul className='datelist-ul-wrapper'>
                    {optionDates.map((item, index) => (
                        <li className='datelist' key={index} onClick={() => handleDateClick(index)}>{index}. {item}</li>
                    ))}
                </ul></> : null}
                
            </div>
            <div class='optionschain-container'>
                
                {optionsChainData ?
                <>
                <p>
                Click on one of these options to get the options matrix. Options Matrix will allow you to accurately
                <br></br> predict the option price given the stock price. This website can&apos;t predict that for you.
                <br></br> Invest only according to your own risk tolerance, please. Do not gamble.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Strike</th>
                            <th>Contract Symbol</th>
                            <th>Last Price</th>
                            <th>Change %</th>
                            <th>In The Money?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(optionsChainData).map(([row, columns]) => (
                            <tr key={row} >
                                <td>{row}</td>
                                <td>${columns["strike"]}</td>
                                <td>{columns["contractSymbol"]}</td>
                                <td style={{width: "20%"}}>
                                    <button className='option-price-cell'style={{backgroundColor: 'transparent', border: 'none', color: '#D3D3D3'}} onClick={() => handleCellClick(columns["lastPrice"], columns['strike'], columns['impliedVolatility'], columns['contractSymbol'])}>
                                        ${columns["lastPrice"]}
                                    </button>
                                </td>
                                <td>{roundToHundredth(columns["percentChange"])}%</td>
                                <td style={{color: 'black'}} className={columns.inTheMoney.toString() === 'false' ? 'red-line' : 'green-line'}>{columns.inTheMoney.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table></> : null}
            </div>
            
            {selectedOptionPrice? <div class='calculation-results'>
                <h2>Calculation Results</h2>
                <p>Selected Option Price: ${selectedOptionPrice} * 100 = ${Math.round(selectedOptionPrice * 100)}</p>
                {showAnalysis ? 
                <div>meow</div>
            : null}
            {showPriceAnalysis()}
            </div>
            : null
        }
        {optionsMatrix ? <table>
            <thead>{renderTableHeaders()}</thead>
            <tbody>
                {renderTableRows()}
                
            </tbody>
        </table> : null }
    </div>)
}