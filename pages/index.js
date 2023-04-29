import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TopMovers from '../components/TopMovers'
import {useState, useEffect} from 'react'
import Datasets from '../components/Datasets'


export default function Home() {
    


  return (<div>
    <TopMovers/>
    <Datasets/>
  </div>
  )


}