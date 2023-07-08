import {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'

export default function InsiderTraders(){
    const [insiderTraders, setInsiderTraders] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
        async function fetchInsiderTraders(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getInsiderTradingData`)
            let data = await response.json()
            console.log(data)
            
            setInsiderTraders(data?.slice(0,10))
            setLoading(false)

          }
          fetchInsiderTraders()
          } catch (error) {
            console.log(error)
          }}
    , [])


    return (
      <>
      {loading ? <Skeleton count={18}/> :
        <div className='carousel-insider'>
          <h1 style={{borderBottom: '1px solid #57d7ba', width: "100%", textAlign: 'center', color: '#d7d7d7'}}>Insider Traders</h1>
            <table className='insider-traders-table'>
              <thead className='insider-traders-table-head'>
                <tr className='insider-traders-table-head-tr'>
                  <th>Name/Position</th>
                  <th>Stock</th>
                  <th>Purchase/Sale</th>
                  <th>Shares</th>
                  <th>Price Per Share</th>
                  <th>Disclosed (EST)</th>
                </tr>
              </thead>
              <tbody className='insider-traders-table-body'>
                {insiderTraders?.map((element, index) => (
                 
                  <tr key={index}>
                    {element.length === 8 ? (
                      <>
                        <td>{element[0]}<br/>
                     <span>{element[1]}</span>
                    </td>
                    <td id='insider-traders-td-stockname'>{element[2]}</td>
                    <td>{element[3]}</td>
                    <td>{element[4]}</td>
                    <td>{element[5]}</td>
                    <td>{element[6]}</td>
                      </>
                    ) : (
                      <>
                        <td>{element[0]}</td>
                        <td id='insider-traders-td-stockname'>{element[1]}</td>
                        <td>{element[2]}</td>
                        <td>{element[3]}</td>
                        <td>{element[4]}</td>
                        <td>{element[5]}</td>
                      </>
                    )}
                     </tr> 
                ))}
              </tbody>
            </table>
        </div>
 } </>)
}

//{insiderTraders?.map((result, index) => )
//
//}