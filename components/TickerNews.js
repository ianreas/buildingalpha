import {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'


export default function TickerNews(){
    const [tickerNews, setTickerNews] = useState([])
    const [timeAgo, setTimeAgo] = useState()
    const [loading, setLoading] = useState(true)
    const [showShadow, setShowShadow] = useState(true);
    const [shadowBottom, setShadowBottom] = useState(0);

    const divRef = useRef(null);
    const shadowRef = useRef(null);

    /* const handleScroll = () => {
      const shadowBottom = shadowRef.current.getBoundingClientRect().bottom;
      const parentBottom = divRef.current.getBoundingClientRect().bottom;
  
      const isShadowAtBottom = shadowBottom >= parentBottom;
  
      setShowShadow(!isShadowAtBottom);
    }; */

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
  
      // Calculate the bottom boundary of the scrollable content
      const contentBottomPosition = divRef.current.getBoundingClientRect().bottom;
      // Calculate the top boundary of the shadow
      /* const shadowTopPosition = shadowRef.current.getBoundingClientRect().top; */
      const shadowTopPosition = shadowRef.current.getBoundingClientRect().bottom;
  
      // If the shadow's top position is greater than or equal to the content's bottom position, hide the shadow
      if (shadowTopPosition >= contentBottomPosition) {
        shadowRef.current.style.opacity = "0";
      } else {
        shadowRef.current.style.opacity = "1";
      }
    };

    useEffect(() => {
      if (divRef.current){
      handleScroll(); // Initial adjustment
    }
    }, []);

    useEffect(() => {
        async function fetchTickerNews(){
            const response = await fetch(`https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=elg153yld6chadlmcl04hfyopyuqxejdymkimjky`)
            const data = await response.json()
            //console.log(data.data)
            setTickerNews(data.data)
            setLoading(false)
        }
        fetchTickerNews()
    }, [])


   

    function calculateTimePassed(startDateStr) {
        const startDate = new Date(startDateStr);
        const currentDate = new Date();
      
        const timeDifference = currentDate - startDate;
      
        // Calculate the time difference in milliseconds, seconds, minutes, and hours
        const millisecondsPassed = timeDifference;
        const secondsPassed = Math.floor(timeDifference / 1000);
        const minutesPassed = Math.floor(timeDifference / (1000 * 60));
        const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      
        if (daysPassed > 1) {
          return `${daysPassed} days ago`;
        } else if (daysPassed === 1) {
          return `${daysPassed} day ago`;
        } else if (hoursPassed > 0) {
          return `${hoursPassed} hour(s) ago`;
        } else if (minutesPassed > 0) {
          return `${minutesPassed} minutes ago`;
        } else {
          return 'Less than a minute ago';
        }
      }



   
    return (
      <>
      {loading ? <Skeleton count={18}/> : 
        <div className='tickernews-component' ref={divRef} onScroll={handleScroll}>
            <div className='tickernews-component-wrapper'>
            <h1 style={{ width: "100%", textAlign: 'center', color: '#d7d7d7', marginTop: '50px'}}>Today&apos; News</h1>
            {tickerNews?.map((news, index) => (
                <div key={index} className='tickernews-item'>
                <div className='tickernews-item-title'>
                    <a className='tickernews-item-title-link' href={news.news_url}>{news.title}</a>
                </div>
                <div className='tickernews-item-sentiment'>{news.sentiment} sentiment {news.sentiment=='Positive' ? '😀' : news.sentiment === 'Neutral' ? "😐" : '☹️' }</div>
                <div className='tickernews-item-tickers'>
                    {news.tickers?.map((ticker, index) => (
                        <div key={index} className='tickernews-item-tickers-ticker'>{ticker}</div>
                    ))}
                </div>
                <div>
                    <img src={news.image_url} alt='article image' width={200} height={200} style={{borderRadius: "10px", objectFit: 'cover'}}/>
                </div>
                <div style={{color: "#c8c8c8"}}>{calculateTimePassed(news.date)}</div>
                </div>
            ))} 
        </div><div className="bottom-shadow" ref={shadowRef} ></div></div>
                    }
                    </>
    )
}