import {useEffect, useRef, memo} from 'react'

export default function TradingViewFundamentalData(ticker){
    const contariner = useRef()
    const scriptRef = useRef(null)

    useEffect(() => {
        if (scriptRef.current && scriptRef.current.parentNode) {
            scriptRef.current.parentNode.removeChild(scriptRef.current);
          }

        const script = document.createElement('script') //maybe change 'script' to funScript
        const theTicker = ticker.ticker
        if (ticker.ticker){
            console.log(ticker)
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
          script.type = "text/javascript";
          script.async = true;
          script.innerHTML = `
          {
            "colorTheme": "light",
            "isTransparent": true,
            "largeChartUrl": "",
            "displayMode": "regular",
            "width": "100%",
            "height": "830",
            "symbol": "${theTicker}",
            "locale": "en"
          }`;
            contariner.current.innerHTML = '';
          contariner.current.appendChild(script)
          scriptRef.current = script;
          
        }
    }, [ticker])

    return (
        <div className="tradingview-widget-container" ref={contariner}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets</span></a> on TradingView</div>
    </div>
    )
}