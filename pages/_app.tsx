import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import contract from '../contractsData/bookmark.json'
import contractAdress from '../contractsData/bookmark-address.json'
import { useConnectWallet } from "../hooks/useConnectWallet";
import { useAccount } from "../hooks/useAccount";
import { AnimatePresence } from "framer-motion"
import { ethers } from "ethers";
interface Account {
  address: string;
  balance: string;
};
// transport UserAccount Info and Contract Info to Layout.tsx and children components.
export const ContractContext = React.createContext<any>(null);
export const UserContext = React.createContext<Account | null>(null);
function MyApp({ Component, pageProps }: AppProps) {
  const [BookMark, setBookMark] = React.useState<any>(null);
  const { connected, connect } = useConnectWallet();
  const { account } = useAccount(connected);
  React.useMemo(() => {
    if (!account || !account.balance) {
      return null;
    }
    console.log(ethers.utils.formatEther(account.balance))
    return ethers.utils.formatEther(account.balance)
  }, [account]);
  useEffect(() => {
    const loadContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Get signer
      const signer = provider.getSigner()
      // Get deployed copy of contract
      const bookmarkContract = new ethers.Contract(contractAdress.address, contract.abi, signer)
      console.log('bookmarkContract',bookmarkContract)
      setBookMark(bookmarkContract)
    }
    
    loadContract()
    .catch(console.error);
  }, [])
  return (
    <AnimatePresence>
    <UserContext.Provider value={account}>
      <ContractContext.Provider value={BookMark}>
      
          <Component {...pageProps} />
      
      </ContractContext.Provider>
      
      </UserContext.Provider>
      </AnimatePresence>
  )
}

export default MyApp
