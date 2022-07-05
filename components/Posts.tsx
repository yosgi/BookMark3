import { ContractContext } from '../pages/_app';
import { useContext, useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import Avatar from "boring-avatars";
import { FaDownload, FaGratipay } from "react-icons/fa";
import { AiOutlineExperiment } from "react-icons/ai";
import { Collapse,Modal,Button,Input } from 'react-daisyui'
import { useConnectWallet } from "../hooks/useConnectWallet";
import { ethers } from "ethers"
const skeletemMock = [1,2,3,4]
interface Bookmark {
  href?: string;
  title?: string;
  icon?:string;
  id:string
}
export const Posts: React.FC = () => {
  const contract = useContext(ContractContext);
  const { connected, chainConnected } = useConnectWallet();
  const [assets, setAssets] = useState<Bookmark[]>([]);
  const getPostList = async () => {
    const posts = await contract.getAllPosts()
    setAssets(posts)
    console.log('posts', posts)
  }
  // download bookmark
  const downloadBookmark = async (url: string,id:string) => {
    const walletRes = await  contract.updateDownLoadAmount(id)
    console.log('walletRes',walletRes)
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bookmark.html";
    a.click();
    await getPostList()
  }

  // tip post
  const tipPost = async (id:string) => {
    await (await contract.tipPostOwner(id, { value: ethers.utils.parseEther("0.1") })).wait()
    getPostList()
  }
  
  useEffect(() => {
    
    if (contract && connected && chainConnected) {
      getPostList()
    } else {
      setAssets([]);
    }
  }, [contract,connected,chainConnected])
  return (
    <div className='rounded-t-xl min-h-default  grid grid-cols-12 lg:gap-8  w-full bg-slate-100'>
      <div className="lg:col-span-8 md:col-span-12 col-span-12 mb-5 space-y-5   rounded-t-xl p-6 ">

        <div className='rounded-none sm:rounded-xl  dark:border-gray-700/80 overflow-x-hidden bg-white dark:bg-gray-900 divide-y-[1px] dark:divide-gray-700/80'>

          { assets.length ? assets.map((asset: any,index) => {
            return (
              <div className='p-5'  key={asset.id}>
                <div className='flex items-center pb-4 space-x-4'>
                  <Avatar
                    size={40}
                    name={asset.author.slice(-5)}
                    variant="marble"
                  />
                  <div
                    className='text-purple-700 text-sm font-bold'>
                    {asset.author.slice(0, 6) + '...'}
                   
                  </div>
                </div>
                <div className='ml-[53px]'>
                  <ReactMarkdown className="max-w-lg break-all ">
                    {asset.description}
                  </ReactMarkdown>
                  <Collapse className='mt-4  border w-3/5 border-base-300 bg-base-100 rounded-box' icon="arrow">
                    <Collapse.Title >
                    Click me to preview
                    </Collapse.Title>
                    <Collapse.Content>

                      <div className="mt-1" tabIndex={0}>
                        <div className="text-xs">
                          {JSON.parse(asset.preview).map((bookMark:Bookmark, index:Number) => {
                            return (
                              <div className="mb-2" key={index+''}>
                                <div className="flex">
                                  <img className="mr-1 w-4 h-4" src={bookMark.icon}></img>{bookMark.title}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Collapse.Content>
                  </Collapse>
                  <div className='pt-4 flex items-center'>
                    <div className="tooltip" data-tip="download">
                      <a onClick={() => downloadBookmark('https://ipfs.infura.io/ipfs/' + asset.hash,asset.id)} className='btn btn-sm btn-circle btn-ghost text-xs' > <FaDownload className='text-indigo-800'></FaDownload></a>
                    </div>
                    <span className='ml-1 text-xs text-indigo-800'>{Number(ethers.utils.commify(asset.downloadAmount)) > 0 ? ethers.utils.commify(asset.downloadAmount):''}</span> 
                    <div className=" tooltip ml-8" data-tip="tip me">
                      <div onClick={()=> {tipPost(asset.id)}} className=' btn btn-sm btn-circle btn-ghost text-xs text-red-500'> <FaGratipay className='text-red-500 '></FaGratipay> </div>
                    </div>
                    <span className='ml-1 text-xs text-red-500'>{Number(ethers.utils.formatEther(asset.tipAmount)) > 0 ? ethers.utils.formatEther(asset.tipAmount):''}</span> 

                  </div>
                </div>

              </div>
            )
          })
            : 
            skeletemMock.map((id) => {
              return (
                <div key={id} className="h-48   mx-auto ">
                    <div className="flex animate-pulse flex-row items-center h-full ml-10 space-x-5">
                      <div className="w-12 bg-gray-300 h-12 rounded-full ">
                      </div>
                          <div className="flex flex-col space-y-3">
                          <div className="w-36 bg-gray-300 h-6 rounded-md ">
                          </div>
                          <div className="w-24 bg-gray-300 h-6 rounded-md ">
                          </div>
                      </div>
                    </div>

                </div>
              )
            })
            
        }
        </div>
      </div>
      <div className='p-6 lg:col-span-4 md:col-span-12 col-span-12 '>
        <div className='p-5 rounded-none sm:rounded-xl border dark:border-gray-700/80 bg-white dark:bg-gray-900 mb-4 bg-yellow-50 dark:bg-yellow-900 !border-yellow-600'>
          <div className=' space-y-2.5 text-yellow-600'>
            <div className='flex items-center space-x-2 font-bold'>
              <AiOutlineExperiment></AiOutlineExperiment>
              <p>Beta warning</p>
            </div>
          </div>
          <p className="text-yellow-600 text-sm leading-[22px]">BookMark3 is still in the beta phase.</p>
          {
            chainConnected ? 
            '':<p className="text-yellow-600 text-sm leading-[22px]">Please connect to <span className='font-bold'>Rinkeby</span>  network.</p>
          }
          
          <p className="text-yellow-600 text-sm leading-[22px]">If you need any help,</p>

          <p className="text-yellow-600 text-sm leading-[22px]">Feel free to contact me at <a className='link' href="mailto:18667911647yosgi@gmail.com">18667911647yosgi@gmail.com</a></p>
        </div>
      </div>
    </div>
  )
};
