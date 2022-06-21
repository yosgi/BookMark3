import { ContractContext } from '../pages/_app';
import { useContext, useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import Avatar from "boring-avatars";
import { FaDownload,FaGratipay } from "react-icons/fa";
import { AiOutlineExperiment } from "react-icons/ai";

export const Posts: React.FC = () => {
    const contract = useContext(ContractContext);
    const [assets, setAssets] = useState<any[]>([]);
    // download bookmark
    const downloadBookmark = async (url: string) => {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "bookmark.html";
  
      a.click();
      
    }
    useEffect(() => {
      const getPostList = async () => {
        console.log('post contract', await contract.name())
        const posts = await contract.getAllPosts()
        setAssets(posts)
        console.log('posts', posts)
      }
      if (contract) {
        getPostList()
      }
    }, [contract])
    return (
        <div className='rounded-t-xl grid grid-cols-12 lg:gap-8 absolute bottom-0 w-full bg-slate-100'>
        <div className="lg:col-span-8 md:col-span-12 col-span-12 mb-5 space-y-5  max-h-default overflow-y-auto  rounded-t-xl p-6 ">

            <div className='rounded-none sm:rounded-xl border dark:border-gray-700/80 bg-white dark:bg-gray-900 divide-y-[1px] dark:divide-gray-700/80'>
              {assets.map((asset: any) => {
                return (
                  <div className='p-5' key={asset.id}>
                    <div className='flex items-center pb-4 space-x-4'>
                      <Avatar
                        size={40}
                        name={asset.author.slice(-5)}
                        variant="marble"
                      />
                      <div 
                        className='text-purple-700 text-sm font-bold'>
                        {asset.author.slice(0, 6)+ '...'}
                        </div>
                    </div>
                    <div className='ml-[53px]'>
                      
                      <ReactMarkdown className="max-w-lg break-all">
                        {asset.description}
                      </ReactMarkdown>
                      <div className='pt-4 '>
                      <div className="tooltip" data-tip="download">
                        <a onClick={() => downloadBookmark('https://ipfs.infura.io/ipfs/' + asset.hash)} className='btn btn-sm btn-circle btn-ghost text-xs' > <FaDownload></FaDownload></a>
                      </div>
                      <div className="tooltip ml-8" data-tip="tip me">
                        <div className=' btn btn-sm btn-circle btn-ghost text-xs '> <FaGratipay></FaGratipay></div>
                      </div>  
                       
                      </div>
                    </div>
                    
                  </div>
                )
              })}
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
              <p className="text-yellow-600 text-sm leading-[22px]">If you need any help,</p>
              
              <p className="text-yellow-600 text-sm leading-[22px]">Please contact me at <a className='link' href="mailto:18667911647yosgi@gmail.com">18667911647yosgi@gmail.com</a></p>
            </div>
        </div>
      </div>
    )
};
