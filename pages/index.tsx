import type { NextPage } from 'next'

import Layout from '../components/Layout'
import Transitions from '../components/Transitions'
import {Posts} from "../components/Posts"
const Home: NextPage = () => {
  return (
      <Layout>
        <Transitions>
          <Posts></Posts>
        </Transitions>
      </Layout>
  )
}

export default Home
