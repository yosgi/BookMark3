import React from "react";
import { ethers } from "ethers";
import '../types/additional.d.ts'


export interface UseAccount {
  account: Account | null;
  checkAccount: () => void;
}

export const useAccount = (
  connected: boolean,
  refreshInterval = 5000
): UseAccount => {
 
  const [account, setAccount] = React.useState<Account | null>(null);
  
  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const accounts = await signer.getAddress();
    return accounts;
  };

  const getAccounBalance = async (address: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return await provider.getBalance(address);
  };

  const checkAccount = React.useCallback(async () => {
    if (!connected) {
      setAccount(null);
      return;
    }
    const address = await getAddress();
    const balance = await getAccounBalance(address);
    setAccount({ address, balance });
  }, [connected]);

  React.useEffect(() => {
    checkAccount();
  }, [connected, checkAccount]);

  return { account, checkAccount };
};