import {useState, useEffect} from 'react'

export default function GetTheStockPrice(ticker){
    const [data, setData] = useState();

    

    return (
        <div>
            {data!==undefined ? data['c'] : null}
        </div>
    )
}