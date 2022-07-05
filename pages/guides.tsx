import Link from 'next/link'
import Layout from '../components/Layout'
import Banner from '../components/Banner';
import Button from '../components/ButtonPrimary';
import Card from '../components/Card'

const GuidesPage = ({user}) => (
  <Layout title="Fort Hateno: Guides" user={user}>
    <Banner>Guides</Banner>
    <h1>Hehehaha</h1>
    <Button>eat my</Button>
  </Layout>
);


import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default GuidesPage;
