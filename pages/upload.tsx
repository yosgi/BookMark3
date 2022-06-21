import type { NextPage } from 'next'
import Layout from "../components/Layout";
import Transitions from '../components/Transitions'
import {CreateAsset} from '../components/CreateAsset'
const Posters: NextPage = () => {
  return (
    <Layout>
      <Transitions>
          <CreateAsset></CreateAsset>
      </Transitions>
    </Layout>
    );
};
export default Posters;
