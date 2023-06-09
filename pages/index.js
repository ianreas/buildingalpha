import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TopMovers from '../components/TopMovers'
import {useState, useEffect} from 'react'
import Datasets from '../components/Datasets'
import SectorPerformance from '../components/SectorPerformance'
import TickerNews from '../components/TickerNews'
import TradingViewStockScreener from '../components/TradingViewStockScreener'
import Intro from '../components/Intro'
import SectorPerformanceFetch from '../components/SectorPerformanceFetch'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
    


  return (<div className='indexpage' style={{backgroundColor: "#1f242d"}} >
    <TopMovers className='topmovers-component'/>
    <Datasets className='datasets-component'/>
    <TickerNews className='tickernews-component'/>
    {<SectorPerformance className='sectorperform-component'/> || <Skeleton count={5}/>}
    <TradingViewStockScreener />
    <Intro/>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#1a1e26", color: "#d7d7d7"}}>
          <h1 style={{textAlign: 'center'}}>Plot the IV surface of the US options</h1>
           <img src='iv_surface_new.png' style={{maxWidth: '90%', height: 'auto'}}></img>
    </div>
    <div className='indexpage-ai-wrapper' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#1a1e26", color: "#d7d7d7"}}>
        <h1>Interact with an LLM trained on financial data.</h1>
        <img src='ai_new.png' style={{maxWidth: '50%', height: 'auto'}}></img>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#1a1e26", color: "#d7d7d7"}}>
      <h1 style={{textAlign: 'center'}}>Calculate Future Options Prices</h1>
    <img src='options_matrix_new.png' style={{maxWidth: '90%', height: 'auto'}}></img>
    </div>
    </div>
  )


}