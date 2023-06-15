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

export default function Home() {
    


  return (<div className='indexpage'>
    <TopMovers className='topmovers-component'/>
    <Datasets className='datasets-component'/>
    <TickerNews className='tickernews-component'/>
    <SectorPerformance className='sectorperform-component'/>
    <TradingViewStockScreener />
    <Intro/>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h1 style={{textAlign: 'center'}}>Plot the IV surface of the US options</h1>
           <img src='ivsurface.png'></img>
    </div>
    <div className='indexpage-ai-wrapper' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Interact with an LLM trained on financial data.</h1>
        <img src='ai.png' style={{maxWidth: '50%', height: 'auto'}}></img>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1 style={{textAlign: 'center'}}>Calculate Future Options Prices</h1>
      <img src='options.png' style={{maxWidth: '90%', height: 'auto'}}></img>
    </div>
    </div>
  )


}