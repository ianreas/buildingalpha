import { useState, useEffect, useRef } from 'react'
import OptionChainCalculatorClassicCalls from '../components/OptionChainCalculatorClassicCalls';
import OptionsChainCalculatorLongPuts from '../components/OptionChainCalculatorLongPuts';



export default function OptionsChainCalculator(){
    const [chosenStrategy, setChosenStrategy] = useState()
    
    const handleClick = (strategy) => {
        setChosenStrategy(strategy)
    }

    let component

    switch (chosenStrategy){
        case 'long-call-option':
            component = <OptionChainCalculatorClassicCalls/>
            break;
        case 'long-put-option':
            component = <OptionsChainCalculatorLongPuts/>
            break;
    }
    
    return (
        <div className='optionschain-page-wrapper'>
            <h1>Options Chain Calculator</h1>
            <h2>Choose The Strategy{chosenStrategy && <span>. Chosen: {chosenStrategy}</span>}</h2>
            <div>
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
            </div>
            <div style={{marginLeft: '10%', marginRight: '10%'}}>{component}</div>
            
        </div>
    )
}