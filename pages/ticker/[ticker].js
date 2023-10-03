import { useRouter } from "next/router";
import TradingViewWidget from "../../components/TradingViewWidget";
import TradingViewFundamentalData from "../../components/TradingViewFundamentals";
import TickerDetails from "../../components/tickerDetails";
import IndividualTickerNews from "../../components/IndividualTickerNews";
import AdvancedChart from '../../components/AdvancedChart'

export default function Ticker() {
  const router = useRouter(); //use router to grab the slug from the url parameters
  const { ticker } = router.query;

  return (
    <div className="ticker-search-wrapper">
      <TickerDetails ticker={ticker} />
      <div className="tradingview-tickersearch-wrapper">
        {/* <div className="tradingview-chart-wrapper">
          <TradingViewWidget ticker={ticker} />
        </div> */}
        <div className="advanced-chart-wrapper">
            <AdvancedChart ticker={ticker}/>
        </div>
        <div className="fundamental-data-wrapper">
          <TradingViewFundamentalData ticker={ticker} />
        </div>
        
      </div>
      <IndividualTickerNews ticker={ticker} />
    </div>
  );
}
