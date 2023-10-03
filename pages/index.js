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
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Llm from '../components/Llm'
import IVsurface from '../components/IVsurface'
import OptionsIndexPage from '../components/OptionsIndexPage'

export default function Home() {
    


  return (<div className='indexpage'  >
    
    <TopMovers className='topmovers-component'/>
    <Datasets className='datasets-component'/>
    <TickerNews className='tickernews-component'/>
    {<SectorPerformance className='sectorperform-component'/> || <Skeleton count={5}/>}
    <Llm />
    <Intro/>
    {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: "#d7d7d7"}} className='iv-surface-ad-wrapper'>
          <h1 style={{textAlign: 'center'}}>Plot the IV surface of the US options</h1>
           <img src='iv_surface_new.png' style={{maxWidth: '90%', height: 'auto'}}></img>
    </div> */}
    
    
      <IVsurface/>
      <OptionsIndexPage/>
    
    
    {/* <div className='indexpage-ai-wrapper' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: "#d7d7d7"}}>
        <h1>Interact with an LLM trained on financial data.</h1>
        <img src='ai_new.png' style={{maxWidth: '50%', height: 'auto'}}></img>
    </div> */}
    {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: "#d7d7d7"}} className='options-ad-wrapper'>
      <h1 style={{textAlign: 'center'}}>Calculate Future Options Prices</h1>
    <img src='options_matrix_new.png' style={{maxWidth: '90%', height: 'auto'}}></img>
    </div> */}
    </div>
  )


}