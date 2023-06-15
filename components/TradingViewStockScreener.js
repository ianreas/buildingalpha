import { useEffect, useRef, memo } from 'react';

export default function TradingViewStockScreener(){
    const contariner = useRef();
  const wrapperRef = useRef(null);
  const scriptRef = useRef(null);
  

  useEffect(
    () => {
        if (scriptRef.current && scriptRef.current.parentNode) {
            scriptRef.current.parentNode.removeChild(scriptRef.current);
          }


        const script = document.createElement("script");
        
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "width": "1100",
        "height": "523",
        "defaultColumn": "overview",
        "defaultScreen": "most_capitalized",
        "showToolbar": true,
        "locale": "en",
        "market": "us",
        "colorTheme": "light"
      }`;
        contariner.current.innerHTML = '';
      contariner.current.appendChild(script)
      scriptRef.current = script;
      
    
    /* return () => {
        if (scriptRef.current && scriptRef.current.parentNode) {
            scriptRef.current.parentNode.removeChild(scriptRef.current);
            contariner.current.removeChild(scriptRef.current);
          }
      } */
},
    []
  );

    return (
        <div className='tradingview_stock_screener_div'>
            <div className="tradingview-widget-container" ref={contariner}>
      <div className="tradingview-widget-container__widget" ref={wrapperRef}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets</span></a> on TradingView</div>
    </div>
        </div>
    )
}