import React,{useContext} from 'react';
import {UserContext} from '../pages/_app';
import { useConnectWallet } from "../hooks/useConnectWallet";
import Link from 'next/link'
import Avatar from "boring-avatars";
import { Dropdown } from 'react-daisyui'
import {BsUpload} from 'react-icons/bs'
export const AccoutBar:React.FC = () => {
    const { connected, connect } = useConnectWallet();
    const  account  = useContext(UserContext);
    
    return (
        <div className='bg-banner px-12 sticky top-0 w-screen h-28 flex items-center justify-between  '>
            <Link  href="/" className='w-full'>
                <div className='w-full text-white font-bold text-2xl cursor-pointer'>BookMark3</div>
            </Link>
           
            {
                account  ? 
                <Dropdown hover={true}  >
                <Dropdown.Toggle className='rounded-full '>
                    <div className='cursor-pointer font-semibold text-white text-xs  w-32 h-10 flex items-center justify-center'>
                    <Avatar
                    size={25}
                    name={account.address.slice(-5)}
                    variant="marble"
                    />
                    <span className='ml-2'> {account.address.slice(0, 6)+ '...'}</span>
                
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-44">
                <Dropdown.Item>
                    <Link className='cursor-pointer w-full' href="/upload">
                        <div className='flex items-center w-full'>
                            <BsUpload className='mr-2'></BsUpload>    Post 
                        </div>
                        
                    </Link>
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                :
                <div onClick={connect} className='font-semibold cursor-pointer text-white text-xs cursor-pointer  bg-white/10 rounded-full w-44 h-10 flex items-center justify-center'>Connect Wallect</div>
            }
           
        </div>
    )
}