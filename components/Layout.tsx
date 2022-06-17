import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { AccoutBar } from '../components/AccountHeader'
import Decentragram from '../abis/Decentragram.json'
import { useConnectWallet } from "../hooks/useConnectWallet";
import { useAccount } from "../hooks/useAccount";
interface IAccount {
  address: string;
  balance: string;
};
export const ContractContext = React.createContext<any>(null);
export const UserContext = React.createContext<IAccount | null>(null);
export default function Layout({ children }: { children: React.ReactNode }) {
  const [decentragram, setDecentragram] = React.useState<any>(null);
  const { connected, connect } = useConnectWallet();
  const { account } = useAccount(connected);
  console.log(account, connected)
  React.useMemo(() => {
    if (!account || !account.balance) {
      return null;
    }
    return window.web3.utils.fromWei(account.balance, "Ether")
  }, [account]);
  useEffect(() => {
    const fetchData = async () => {
      const networkId = await window.web3.eth.net.getId()
      const networkData = Decentragram.networks[3]
      if (networkData) {
        const decentragram = new window.web3.eth.Contract(Decentragram.abi, networkData.address)
        setDecentragram(decentragram)
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

      <div className='z-[-1] fixed w-screen h-screen overflow-hidden'>
        <Image
          alt="background"
          src="/background.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <UserContext.Provider value={account}>
        <ContractContext.Provider value={decentragram}>
          <AccoutBar></AccoutBar>
          {children}
        </ContractContext.Provider>
      </UserContext.Provider>
    </>
  )
}