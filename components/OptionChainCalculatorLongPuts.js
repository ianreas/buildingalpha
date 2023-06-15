import {useState, useEffect} from 'react'

//LOGIC:
//FETCH THE STOCK PRICE
//ASK THE USER FOR A TICKER
//GIVE THE USER THE EXPIRATION DATES
//USER CLICKS ON A DATE => WE GIVE THEM STRIKE PRICES FOR THAT DATE
//USER CHOOSES A STRIKE PRICE => WE GIVE THEM AN OPTION MATRIX


export default function OptionChainCalculatorLongPuts(){
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
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionsPriceMatrix?price=${price}&symbol=${symbol}&strike=${strike}&volatility=${volatility}&stockPrice=${tickerPrice}&type=put`)
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
        async function fetchData() { const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionsChainData?ticker=${ticker}&index=${dateArrayIndex}&type=put`)
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
                <th>Possible Prices</th>
            </tr>
        )
    }


    const renderTableRows = () => {
        return optionsMatrix[0].map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                    <td key={columnIndex} className={getCellClassName(cell)}>{cell}</td>
                ))}
                <td>{optionsMatrix[2][rowIndex]}</td>
            </tr>
        ))
        
      };




        

    
    return (<div>
            <h1>Long Put Strategy</h1>
            <div>
            <form onSubmit={handleTickerSubmit}>
                    <label>
                        Select Ticker
                        <input type='text' value={ticker} onChange={handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
        { tickerPrice ? <p>Ticker Price: {tickerPrice}</p> : null}
                {tickerPrice ? <h2>Choose The Expiration Date</h2> : null}
                {optionDates ? <ul>
                    {optionDates.map((item, index) => (
                        <li className='datelist' key={index} onClick={() => handleDateClick(index)}>{index}. {item}</li>
                    ))}
                </ul> : null}
                
            </div>
            <div class='optionschain-container'>
                {optionsChainData? 
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
                                <td>{columns["strike"]}</td>
                                <td>{columns["contractSymbol"]}</td>
                                <td>
                                    <button onClick={() => handleCellClick(columns["lastPrice"], columns['strike'], columns['impliedVolatility'], columns['contractSymbol'])}>
                                        {columns["lastPrice"]}
                                    </button>
                                </td>
                                <td>{columns["percentChange"]}</td>
                                <td className={columns.inTheMoney.toString() === 'false' ? 'red-line' : 'green-line'}>{columns.inTheMoney.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : null}
            </div>
            
            {selectedOptionPrice? <div class='calculation-results'>
                <h2>Calculation Results</h2>
                <p>Selected Option Price: ${selectedOptionPrice} * 100 = ${Math.round(selectedOptionPrice * 100)}</p>
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