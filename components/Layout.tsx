import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { AccoutBar } from '../components/AccountHeader'


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Head>
        <title>BookMark3</title>
        <meta name="description" content="bookmark in web3.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='z-[-1] fixed w-screen h-screen overflow-hidden'>
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