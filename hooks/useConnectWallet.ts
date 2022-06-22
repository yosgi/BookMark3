import React from "react";
import { ethers } from "ethers";
import '../types/additional.d.ts'
export interface UseConnectWallet {
  connected: boolean;
  chainConnected:boolean;
  connect: () => void;
}

export const useConnectWallet = (): UseConnectWallet => {
  const [connected, setConnected] = React.useState<boolean>(false);
  const [chainConnected,setChainConnected] = React.useState<boolean>(false);
 
  const checkAccountConnected = (accounts: string[]) => {
    if (!accounts.length) {
      setConnected(false);
    } else {
      setConnected(true);
    }
  };
  const checkChainConnected = (chainId: string) => {
    console.log('chainId',chainId)
    console.log('targetChainId',process.env.NEXT_PUBLIC_CHAINID)
    if (chainId === process.env.NEXT_PUBLIC_CHAINID) {
      setChainConnected(true);
    } else {
      setChainConnected(false);
    }
  }

  const connect = React.useCallback(async () => {
    const handleConnect = async() => {
      setConnected(true);
      const  currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      setChainConnected(currentChainId === process.env.NEXT_PUBLIC_CHAINID);
      if (window.ethereum) {
        window.ethereum.on('chainChanged',checkChainConnected)
        window.ethereum.on('accountsChanged',checkAccountConnected)
      }
    };

    const handleError = () => {
      setConnected(false);
    };

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
    
      console.log("Account:", await signer.getAddress());
      handleConnect()
    } catch (error) {
      handleError()
    }
  
  }, []);
  React.useEffect(() => {
    connect();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", checkAccountConnected);
        window.ethereum.removeListener("chainChanged", checkChainConnected);
      }
    };
  }, [connect]);


  return { connected, connect,chainConnected };
};