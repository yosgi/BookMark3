import type { NextPage } from 'next'
import Layout from "../components/Layout";
import {ContractContext} from '../pages/_app';
import {useContext,useEffect,useState} from 'react';
const Posters: NextPage = () => {

  const contract = useContext(ContractContext);
  
  const [assets,setAssets] = useState<any[]>([]);
  useEffect(() => { 
    const getImageList = async () => {
      console.log('post contract',await contract.name()  )
      const posts = await contract.getAllPosts()
      console.log('posts',posts)
    }
    if (contract) {
      getImageList()
    }
    
   }, [contract])
  return (
  <Layout>
    {assets.map((asset:any) => {
      return (
        <div key={asset.id}>
          <img src={asset.url} alt=""/>
        </div>
      )
    })}
    </Layout>);
};
export default Posters;
