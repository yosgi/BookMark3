import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import {AccoutBar} from '../components/AccountHeader'
import {CreateAsset} from '../components/CreateAsset'
import Link from 'next/link'
import Decentragram from '../abis/Decentragram.json'

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fetchData = async () => {
      const networkId = await window.web3.eth.net.getId()
      const networkData = Decentragram.networks[networkId]
      console.log(networkId)
      if(networkData) {
        const decentragram = new window.web3.eth.Contract(Decentragram.abi, networkData.address)
      }
    }
    fetchData()
      .catch(console.error);
  }, [])
  return (
    <>
     <Head>
        <title>BookMark3</title>
        <meta name="description" content="bookmark in web3.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div  className='z-[-1] fixed w-screen h-screen overflow-hidden'>
        <Image
          alt="background"
          src="/background.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <AccoutBar></AccoutBar>
      {children}
    </>
  )
}