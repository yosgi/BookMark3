import React,{useContext} from 'react';
import {UserContext} from '../components/Layout';
import { useConnectWallet } from "../hooks/useConnectWallet";
import Link from 'next/link'

export const AccoutBar:React.FC = () => {
    const { connected, connect } = useConnectWallet();
    const  account  = useContext(UserContext);
    
    return (
        <div className='px-12 w-screen h-28 flex items-center justify-between  '>
            <Link href="/posters">
                <div className='text-white font-bold text-2xl'>BookMark3</div>
            </Link>
           
            {
                account  ? 
                <Link href="/">
                <div className='text-white text-xs   bg-white/10 rounded-full w-32 h-10 flex items-center justify-center'>{account.address.slice(0, 6)+ '...'}</div>
                </Link>:
                <div onClick={connect} className='text-white text-xs cursor-pointer  bg-white/10 rounded-full w-32 h-10 flex items-center justify-center'>Connect Wallect</div>
            }
           
        </div>
    )
}