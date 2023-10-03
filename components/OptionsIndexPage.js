import { useState, useEffect, useRef } from 'react'
import OptionChainCalculatorClassicCalls from '../components/OptionChainCalculatorClassicCalls';
import OptionsChainCalculatorLongPuts from '../components/OptionChainCalculatorLongPuts';
import Select from 'react-select'

export default function OptionsChainCalculator(){
    const [chosenStrategy, setChosenStrategy] = useState()
    
    const handleClick = (strategy) => {
        setChosenStrategy(strategy)
    }

    const handleChange = (option) => {
        setChosenStrategy(option.value)
    }

    let component

    switch (chosenStrategy){
        case 'long-call-option':
            component = <OptionChainCalculatorClassicCalls isComponent={true}/>
            break;
        case 'long-put-option':
            component = <OptionsChainCalculatorLongPuts isComponent={true}/>
            break;
    }

    const options = [
        {value: 'long-call-option', label: "Long Call Option"},
        {value: 'long-put-option', label: "Long Put Option"}
    ]

    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '20%',
            color: 'black'
        }),
    };
    
    return (
        <div className='optionschain-component-wrapper'>
            <h1>Options Chain Calculator</h1>
            <h2>Choose The Strategy</h2>
            <Select options={options} onChange={handleChange}  styles={customStyles}/>
            {/* <div>
               <div className='longcalloption-wrapper'>
                <h3 onClick={() => handleClick('long-call-option')}>Long Call Options (bullish)</h3>
                <p>A long call option is, simply, your standard call option in which the buyer has the right,
                 <br></br>but not the obligation, to buy a stock at a strike price in the future.</p>
                </div>
                <div className='longputoption-wrapper'>
                    <h3 onClick={() => handleClick('long-put-option')}>Long Put Options (bearish)</h3>
                    <p>A long put refers to buying a put option,
                    <br></br>typically in anticipation of a decline in the underlying asset.</p>
                </div> 
            </div> */}
            <div style={{marginLeft: '10%', marginRight: '10%'}}>{component}</div>
            
        </div>
    )
}