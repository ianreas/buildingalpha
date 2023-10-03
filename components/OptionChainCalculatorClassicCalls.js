import {useState, useRef, useEffect} from 'react'
import Select from 'react-select'
//LOGIC:
//FETCH THE STOCK PRICE
//ASK THE USER FOR A TICKER
//GIVE THE USER THE EXPIRATION DATES
//USER CLICKS ON A DATE => WE GIVE THEM STRIKE PRICES FOR THAT DATE
//USER CHOOSES A STRIKE PRICE => WE GIVE THEM AN OPTION MATRIX


export default function OptionChainCalculatorClassicCalls({isComponent}){
    const url = 'https://twelve-data1.p.rapidapi.com/price?symbol=AMZN&format=json&outputsize=30';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '445c39de8amsh8bd26cd960e448ep162acfjsn89f10e51b377',
		'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
	}
};

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

    const [scrollableOptionPricesVisible, setScrollableOptionPricesVisible] = useState(true)

    const [optionsMatrixLoading, setOptionsMatrixLoading] = useState(false);

    const tableRef = useRef(null);

    const [datesLoading, setDatesLoading] = useState(false);
    const [tickerPriceLoading, setTickerPriceLoading] = useState(false);

    const convertToCSV = (data) => {
        const headers = [...data[1], "Possible Stock Prices"];
        const rows = data[0].map((row, index) => [
            ...row, 
            data[2][index],
        ]);
        const csvString = [headers, ...rows]
    .map(row => row.map(value => `"${value}"`).join(','))
    .join('\n');
        return csvString;
    }

    const downloadCSV = () => {
        if (!optionsMatrix) return;
        const csvString = convertToCSV(optionsMatrix);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };


    const handleChange = (event) => {
        setTicker(event.target.value.toUpperCase());
    };

    const handleTickerSubmit = (event) => {

        event.preventDefault();
    
        if (!ticker) return;
    
        async function fetchStockPrice(){
            try {
                setTickerPriceLoading(true);
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setTickerPrice(result.price)
                setTickerPriceLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchStockPrice();
    
        async function fetchDates(){
            setDatesLoading(true);
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionChainDates?ticker=${ticker}`)
            const data = await response.json()
            console.log(data)
            const dateObject = data.dates.map((date, index) => ({
                value: index,
                label: date
            }))
            setOptionDates(dateObject)
            setDatesLoading(false);
        }
        fetchDates()
    
        }

    const handleCellClick = (price, strike, volatility, symbol) => { //fetches the optionsmatrix 
        setSelectedOptionPrice(price)
        

        setScrollableOptionPricesVisible(false)

        async function fetchOptionsMatrix(){
            setOptionsMatrixLoading(true);
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionsPriceMatrix?price=${price}&symbol=${symbol}&strike=${strike}&volatility=${volatility}&stockPrice=${tickerPrice}&type=call`)
            const data = await response.json()
            console.log(data)
            setOptionsMatrix(data)
            setOptionsMatrixLoading(false);
        }
        fetchOptionsMatrix()

    }

    const handleDateClick = (element) => {
        setScrollableOptionPricesVisible(true)
        setDateArrayIndex(element.value)

        if (!ticker) return;
        
    }

    const [strikePriceTableLoading, setStrikePriceTableLoading] = useState(false);

    useEffect(()=> { //fetches the table of strike prices
        if (dateArrayIndex)
        { 
        async function fetchData() {
        setStrikePriceTableLoading(true);
        const response = await fetch(`https://buildingalpha-new.herokuapp.com/getOptionsChainData?ticker=${ticker}&index=${dateArrayIndex}&type=call`)
        const data = await response.json();
        console.log(data);
        setOptionsChainData(data);
        setStrikePriceTableLoading(false);
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



      const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
            marginBottom: '30px',
            color: 'black'
        }),
    };

  
        

    
    return (<div className='classic-calls-wrap'> 
            <h1>Long Call Strategy</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'block'}}>
            <form onSubmit={handleTickerSubmit} style={{display: 'flex', alignItems: 'center'}}>
                    <label>
                        Select Ticker: 
                        <input type='text' value={ticker} onChange={handleChange} style={{marginLeft: '0.5rem'}}/>
                    </label>
                    <button className='arrowbuton' type='submit' value='Submit' style={{background: 'transparent', outline: 'none', border: 'none', position: 'relative', top: '2px'}}>
                        <img src='/buttonarrow.png' classNAme='faviconbutton'/>
                    </button><span>(ex: TSLA)</span>
                    {/* <input type='submit' value='Submit' /> */}
                </form>
                </div>
        {/* {tickerPriceLoading && <div>Ticker Price Loading....</div>} */}
        { tickerPrice ? <p>Ticker Price: ${roundToHundredth(tickerPrice)}</p> : null}
        
                {datesLoading && <div style={{marginTop: '10px', marginBottom: "10px"}}>Expiration Dates Loading....</div>}
                {optionDates ?  <><p>Choose the Expiration Date: </p>
                <Select options={optionDates} onChange={handleDateClick} styles={customStyles} /></> : null}
                
            </div>
            {strikePriceTableLoading && <div>Loading the strike price table...</div>}
            <div class='optionschain-container'>
                
                {optionsChainData && scrollableOptionPricesVisible ?
                <div className='scrollable-option-prices-table' style={{ height: scrollableOptionPricesVisible ? 'auto' : '50px', overflow: 'hidden' }}>
                <p>
                Click on one of these options to get the options matrix. Options Matrix will allow you to accurately
                <br></br> predict the option price given the stock price. This website can&apos;t predict that for you.
                <br></br> Invest only according to your own risk tolerance, please. Do not gamble.
                </p>
                <table style={{margin: '0px'}}>
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
                            <tr key={row} className='strike-price-row'  onClick={() => handleCellClick(columns["lastPrice"], columns['strike'], columns['impliedVolatility'], columns['contractSymbol'])}>
                                <td>{row}</td>
                                <td>${columns["strike"]}</td>
                                <td>{columns["contractSymbol"]}</td>
                                <td style={{width: "20%"}} >
                                      ${columns["lastPrice"]}
                                   
                                </td>
                                <td>{roundToHundredth(columns["percentChange"])}%</td>
                                <td style={{color: 'black'}} className={columns.inTheMoney.toString() === 'false' ? 'red-line' : 'green-line'}>{columns.inTheMoney.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => setScrollableOptionPricesVisible(!scrollableOptionPricesVisible)}>
                    {scrollableOptionPricesVisible ? "Hide the options" : 'Show the options'}
                </button>
                </div> : null}
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
        {optionsMatrixLoading ? (
      <div>Loading the CSV with the options matrix...</div> // This is the loading animation. Replace with your preferred animation or spinner.
    ) : (
        optionsMatrix && (
  <>
    {isComponent ? (<button class='downloadcsv-button' onClick={downloadCSV}>Download To CSV</button>) :
    (

    <table ref={tableRef}>
      <thead>{renderTableHeaders()}</thead>
      <tbody>{renderTableRows()}</tbody>
    </table>)}
  </>
))}
        
    </div>)
}