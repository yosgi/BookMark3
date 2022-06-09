import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import {AccoutBar} from '../components/AccountHeader'
import {CreateAsset} from '../components/CreateAsset'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
      <CreateAsset></CreateAsset>
    </div>
  )
}

export default Home
