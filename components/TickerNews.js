import {useState, useEffect} from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'


export default function TickerNews(){
    const [tickerNews, setTickerNews] = useState([])
    const [timeAgo, setTimeAgo] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTickerNews(){
            const response = await fetch(`https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=elg153yld6chadlmcl04hfyopyuqxejdymkimjky`)
            const data = await response.json()
            console.log(data.data)
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
        <div className='tickernews-component'>
            <div className='tickernews-component-wrapper'>
            <h1 style={{borderBottom: '2px solid black', width: "100%", textAlign: 'center'}}>News</h1>
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
                <div>{calculateTimePassed(news.date)}</div>
                </div>
            ))} 
        </div></div>
                    }
                    </>
    )
}