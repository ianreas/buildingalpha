import { useRouter } from "next/router"
import TradingViewWidget from "../../components/TradingViewWidget";
import TradingViewFundamentalData from "../../components/TradingViewFundamentals";
import TickerDetails from "../../components/tickerDetails";
import IndividualTickerNews from "../../components/IndividualTickerNews";

export default function Ticker(){
    const router = useRouter();           //use router to grab the slug from the url parameters
    const { ticker } = router.query;

    

    return (
        <div className='ticker-search-wrapper'>
            <TickerDetails ticker={ticker}/>
            <div className='tradingview-tickersearch-wrapper'>
            <TradingViewWidget ticker={ticker}/>
            <TradingViewFundamentalData ticker={ticker}/>
            </div>
            <IndividualTickerNews ticker={ticker}/>
        </div>
    )
}