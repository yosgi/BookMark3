import type { NextPage } from 'next'
import {CreateAsset} from '../components/CreateAsset'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Layout>
        <CreateAsset></CreateAsset>
      </Layout>
    </div>
  )
}

export default Home
