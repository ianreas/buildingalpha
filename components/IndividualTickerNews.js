import {useState, useEffect} from 'react'

export default function IndividualTickerNews(ticker){
    const [tickerData, setTickerData] = useState();

    useEffect(() => {
        async function fetchTickerNews(){
            if (ticker.ticker){
            const theTicker = ticker.ticker;
            const response = await fetch(`https://stocknewsapi.com/api/v1?tickers=${theTicker}&items=3&page=1&token=elg153yld6chadlmcl04hfyopyuqxejdymkimjky`)
            const data = await response.json();
            console.log(data);
            setTickerData(data.data);
            }
        }
        fetchTickerNews();
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
        <div className='individual-tickernews-component-wrapper'>
          <h1 style={{color: "#e1e1e1", textAlign: 'center'}}>News</h1>
        <div className='individual-tickernews-component'>
            {tickerData?.map((news, index) => (
                <div key={index} className='individual-tickernews-item'>
                <div className='individual-tickernews-item-title'>
                    <a className='individual-tickernews-item-title-link' style={{color: '#e1e1e1'}}href={news.news_url}>{news.title}</a>
                </div>
                <div className='individual-tickernews-item-sentiment' style={{color: '#e1e1e1'}}>{news.sentiment} {news.sentiment=='Positive' ? '😀' : news.sentiment === 'Neutral' ? "😐" : '☹️' } sentiment</div>
                <div className='individual-tickernews-item-tickers'>
                    {news.tickers?.map((ticker, index) => (
                        <div key={index} className='individual-tickernews-item-tickers-ticker' style={{color: '#e1e1e1'}}>{ticker}</div>
                    ))}
                </div>
                <div className='individual-tickernews-image-container'>
                    <img src={news.image_url} alt='article image' width={200} height={200}/>
                </div>
                <div style={{color: '#e1e1e1'}}>{calculateTimePassed(news.date)}</div>
                </div>
            ))} 
        </div> 
        </div>
                    
    )
}