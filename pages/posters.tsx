import Layout from "../components/Layout";
import {ContractContext} from '../components/Layout';
import {useContext,useEffect,useState} from 'react';
const Posters: React.FC = () => {
  console.log('ContractContext')
  console.log(ContractContext)
  const contract = useContext(ContractContext);
  const [assets,setAssets] = useState<any[]>([]);
  useEffect(() => { 
    const getImageList = async () => {
      const imagesCount = await contract.methods.imageCount().call()
      for(let i = 0; i < imagesCount; i++) {
        const image =  await contract.methods.images(i).call()
        setAssets(assets => [...assets,image])
      }
    }
    getImageList()
   }, [])
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
