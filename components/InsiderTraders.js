import {useEffect, useState} from 'react'

export default function InsiderTraders(){
    const [insiderTraders, setInsiderTraders] = useState()

    useEffect(() => {
        try {
        async function fetchInsiderTraders(){
            const response = await fetch(`https://buildingalpha-new.herokuapp.com/getInsiderTradingData`)
            let data = await response.json()
            console.log(data)
            
            setInsiderTraders(data?.slice(0,10))

          }
          fetchInsiderTraders()
          } catch (error) {
            console.log(error)
          }}
    , [])


    return (
        <div className='carousel-insider'>
          <h1 style={{borderBottom: '2px solid black', width: "100%", textAlign: 'center'}}>Insider Traders</h1>
            <table>
              <thead>
                <tr>
                  <th>Name/Position</th>
                  <th>Stock</th>
                  <th>Purchase/Sale</th>
                  <th>Shares</th>
                  <th>Date</th>
                  <th>Disclosed (EST)</th>
                </tr>
              </thead>
              <tbody>
                {insiderTraders?.map((element, index) => (
                 
                  <tr key={index}>
                    {element.length === 7 ? (
                      <>
                        <td>{element[0]}<br/>
                     <span>{element[1]}</span>
                    </td>
                    <td>{element[2]}</td>
                    <td>{element[3]}</td>
                    <td>{element[4]}</td>
                    <td>{element[5]}</td>
                    <td>{element[6]}</td>
                      </>
                    ) : (
                      <>
                        <td>{element[0]}</td>
                        <td>{element[1]}</td>
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
    )
}

//{insiderTraders?.map((result, index) => )
//
//}