import React from "react";
import { ethers } from "ethers";
import '../types/additional.d.ts'
export interface UseConnectWallet {
  connected: boolean;
  connect: () => void;
}

export const useConnectWallet = (): UseConnectWallet => {
  const [connected, setConnected] = React.useState<boolean>(false);
 
  const checkAccountConnected = (accounts: string[]) => {
    if (!accounts.length) {
      setConnected(false);
    } else {
      setConnected(true);
    }
  };

  const connect = React.useCallback(async () => {
    const handleConnect = () => {
      setConnected(true);

      if (window.ethereum) {
        window.ethereum.on('chainChanged',checkAccountConnected)
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
        window.ethereum.removeListener("chainChanged", checkAccountConnected);
      }
    };
  }, [connect]);


  return { connected, connect };
};