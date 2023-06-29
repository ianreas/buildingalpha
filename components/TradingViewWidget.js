// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

function TradingViewWidget(ticker) {
  const contariner = useRef();
  const wrapperRef = useRef(null);
  const scriptRef = useRef(null);
  

  useEffect(
    () => {
        if (scriptRef.current && scriptRef.current.parentNode) {
            scriptRef.current.parentNode.removeChild(scriptRef.current);
          }



        const script = document.createElement("script");
        if (ticker.ticker){
        console.log(ticker.ticker)
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            [
              "${ticker.ticker}|1D"
            ]
          ],
          "chartOnly": false,
          "width": 1000,
          "height": 500,
          "locale": "en",
          "colorTheme": "dark",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
        contariner.current.innerHTML = '';
      contariner.current.appendChild(script)
      scriptRef.current = script;
      
    }
    /* return () => {
        if (scriptRef.current && scriptRef.current.parentNode) {
            scriptRef.current.parentNode.removeChild(scriptRef.current);
            contariner.current.removeChild(scriptRef.current);
          }
      } */
},
    [ticker]
  );

  return (
    <div className="tradingview-widget-container" ref={contariner}>
      <div className="tradingview-widget-container__widget" ref={wrapperRef}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets</span></a> on TradingView</div>
    </div>
  );
}

export default memo(TradingViewWidget);